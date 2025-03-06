const nodemailer = require("nodemailer");

const sendClass = async (email, classDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use any email provider or SMTP server
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password (for Gmail)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Class Booking Confirmation - Fitness Center",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #333; text-align: center;">Thank You for Booking a Class!</h2>
        <p>Dear <strong>${classDetails.name}</strong>,</p>
        <p>We are excited to confirm your booking at our fitness center! Below are the details of your booked class:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 10px; background-color: #007bff; color: #ffffff;">Class Name</th>
            <th style="border: 1px solid #ddd; padding: 10px; background-color: #007bff; color: #ffffff;">Date</th>
            <th style="border: 1px solid #ddd; padding: 10px; background-color: #007bff; color: #ffffff;">Time</th>
            <th style="border: 1px solid #ddd; padding: 10px; background-color: #007bff; color: #ffffff;">Trainer</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${classDetails.className}</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${classDetails.slotDate}</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${classDetails.stime} - ${classDetails.etime}</td>
            <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${classDetails.trainerName}</td>
          </tr>
        </table>
  
        <p>If you need to reschedule or have any questions, please contact us at <a href="mailto:support@fitnesscenter.com">support@fitnesscenter.com</a>.</p>
        
        <p style="font-weight: bold;">Stay Fit, Stay Healthy!</p>
        <p>Best regards,</p>
        <p style="font-style: italic;">The Fitness Center Team</p>
      </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Mail sent sucessfully");
  } catch (error) {
    console.error("Error sending mail:", error);
    throw new Error("Mail sending failed");
  }
};

module.exports = sendClass;
