"use server";

import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./formSchemas";
import { EmailTemplate } from "@/components/features/contact/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  const { error } = await resend.emails.send({
    from: `Crispy Panel <${process.env.RESEND_FROM_EMAIL}>`,
    to: [emailFormData.email],
    subject: "Welcome",
    react: EmailTemplate({ firstName: emailFormData.firstName }),
  });

  if (error) {
    throw error;
  }
};
