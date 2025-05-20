const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body);

        // Erstelle einen Nodemailer-Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // E-Mail-Inhalt
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Neue Nachricht von ${name}`,
            html: `
        <h3>Neue Nachricht vom Kontaktformular</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
        };

        // E-Mail senden
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "E-Mail gesendet!" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Fehler beim Senden der Nachricht." }),
        };
    }
};