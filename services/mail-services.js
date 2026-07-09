import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../config/mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendWelcomeEmail(user) {
  const templatePath = path.join(
    __dirname,
    "../templates/welcome-email.ejs"
  );
  const html = await ejs.renderFile(templatePath, {
    name: user.name,
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: user.email,
    subject: "¡Bienvenido/a!",
    html,
  });
};