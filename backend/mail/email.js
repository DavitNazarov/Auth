import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationCode = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    throw new Error(`Error sending verification Email:${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "149629a4-9d63-4453-99dd-c67bb1aa8a70",
      template_variables: {
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};
