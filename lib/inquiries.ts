import { ObjectId } from "mongodb";
import { unstable_noStore as noStore } from "next/cache";
import { getDatabase } from "@/lib/mongodb";

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
};

export type InquiryPage = {
  items: ContactInquiry[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type InquiryDocument = Omit<ContactInquiry, "id" | "createdAt"> & {
  _id?: ObjectId;
  createdAt: Date;
  ipHash: string;
};

export async function createInquiry(input: Omit<ContactInquiry, "id" | "createdAt"> & { ipHash: string }) {
  const db = await getDatabase();
  await db.collection<InquiryDocument>("contact_inquiries").insertOne({ ...input, createdAt: new Date() });
}

export async function getInquiries(page = 1, pageSize = 5): Promise<InquiryPage> {
  noStore();
  const db = await getDatabase();
  const collection = db.collection<InquiryDocument>("contact_inquiries");
  const total = await collection.countDocuments();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const documents = await collection.find({}, { projection: { ipHash: 0 } })
    .sort({ createdAt: -1 })
    .skip((safePage - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  const items = documents.map(document => ({
    id: document._id?.toHexString() ?? "",
    name: document.name,
    email: document.email,
    company: document.company,
    message: document.message,
    createdAt: document.createdAt.toISOString(),
  }));
  return { items, page: safePage, pageSize, total, totalPages };
}

export async function deleteInquiry(id: string) {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDatabase();
  const result = await db.collection<InquiryDocument>("contact_inquiries").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
