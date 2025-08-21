// backend/functions/index.js

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
const nodemailer = require("nodemailer");
const functions = require("firebase-functions");

setGlobalOptions({region: "us-central1"});

exports.sendEmailOnNewMessage =
onDocumentCreated("mail/{mailId}", async (event) => {
  const snap = event.data;
  if (!snap) {
    console.log("No data associated with the event");
    return;
  }
  const mailData = snap.data();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password,
      },
    });

    const mailOptions = {
      from: `"Tu Nombre o App" <${functions.config().gmail.email}>`,
      to: mailData.to,
      subject: mailData.message.subject,
      text: mailData.message.text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente a:", mailData.to);

    return snap.ref.delete();
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return null;
  }
});
