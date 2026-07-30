import nodemailer from "nodemailer";

type InquiryEmail = {
  name: string;
  email: string;
  company: string;
  message: string;
  recipient: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export async function sendInquiryNotification(inquiry: InquiryEmail) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  if (!host || !Number.isInteger(port) || !user || !pass || !from) {
    console.error("Contact email was not sent because SMTP is not configured.");
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.recipient)) throw new Error("The notification recipient email is invalid.");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  const safeName = inquiry.name.replace(/[\r\n]/g, " ").slice(0, 100);
  await transporter.sendMail({
    from: `"Nazmul Hasan Portfolio" <${from}>`,
    to: inquiry.recipient,
    replyTo: inquiry.email,
    subject: `New portfolio inquiry from ${safeName}`,
    text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company || "Not provided"}\n\n${inquiry.message}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#17202a">
        <h1 style="font-size:24px">New portfolio inquiry</h1>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(inquiry.name)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(inquiry.email)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd"><strong>Company</strong></td><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(inquiry.company || "Not provided")}</td></tr>
        </table>
        <h2 style="font-size:18px">Message</h2>
        <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(inquiry.message)}</p>
      </div>
    `,
  });
  return true;
}
