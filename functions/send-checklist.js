const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  const { email } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Deine kostenlose ADHS-Checkliste',
      text: 'Danke für deine Anmeldung! Hier ist deine Checkliste.',
      attachments: [{
        filename: 'ADHS_Checkliste.pdf',
        path: `${process.cwd()}/../public/checkliste.pdf`,
        contentType: 'application/pdf'
      }]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'E-Mail konnte nicht gesendet werden.' })
    };
  }
};