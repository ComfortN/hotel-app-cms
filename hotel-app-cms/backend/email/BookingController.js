const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luxestayhotel@gmail.com',
    pass: 'brns ccsd jmqg mzrg'
  }
});

// Function to send booking status email
const sendBookingStatusEmail = async (reservation) => {
  const { email, firstName, lastName, status, checkInDate, checkOutDate, cartItems } = reservation;

  let subject, text;

  if (status === 'approved') {
    subject = 'Your Booking Has Been Approved';
    text = `Dear ${firstName} ${lastName},\n\nWe're pleased to inform you that your booking has been approved!\n\nBooking Details:\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nAccommodation: ${cartItems[0]?.name || 'N/A'}\n\nWe look forward to welcoming you soon!\n\nBest regards,\nYour Hotel Team`;
  } else if (status === 'rejected') {
    subject = 'Update on Your Booking Request';
    text = `Dear ${firstName} ${lastName},\n\nWe regret to inform you that we are unable to accommodate your booking request at this time.\n\nBooking Details:\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nAccommodation: ${cartItems[0]?.name || 'N/A'}\n\nIf you have any questions or would like to explore alternative options, please don't hesitate to contact us.\n\nWe apologize for any inconvenience and hope to have the opportunity to serve you in the future.\n\nBest regards,\nYour Hotel Team`;
  }

  const mailOptions = {
    from: 'your_hotel@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;  // Propagate the error
  }
};

// API route to trigger email sending
app.post('/send-booking-email', async (req, res) => {
  const reservation = req.body;

  try {
    await sendBookingStatusEmail(reservation);
    res.status(200).send('Booking status email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
