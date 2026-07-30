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

type InquiryDocument = Omit<ContactInquiry, "id" | "createdAt"> & {
  _id?: ObjectId;
  createdAt: Date;
  ipHash: string;
};

export async function createInquiry(input: Omit<ContactInquiry, "id" | "createdAt"> & { ipHash: string }) {
  const db = await getDatabase();
  await db.collection<InquiryDocument>("contact_inquiries").insertOne({ ...input, createdAt: new Date() });
}

export async function getInquiries(): Promise<ContactInquiry[]> {
  noStore();
  const db = await getDatabase();
  const documents = await db.collection<InquiryDocument>("contact_inquiries")
    .find({}, { projection: { ipHash: 0 } })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();
  return documents.map(document => ({
    id: document._id?.toHexString() ?? "",
    name: document.name,
    email: document.email,
    company: document.company,
    message: document.message,
    createdAt: document.createdAt.toISOString(),
  }));
}
