export type EmailPayload = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: EmailPayload): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.log("[email mock] to=%s subject=%s\n%s", to, subject, text);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: "noreply@thedbot.com", to, subject, text }),
  });
  if (!res.ok) {
    console.error("Resend error", await res.text());
  }
}


