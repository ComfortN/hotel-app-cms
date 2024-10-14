const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'luxestayhotel@gmail.com',
    pass: 'brns ccsd jmqg mzrg'
  }
});

const sendBookingStatusEmail = async (reservation) => {
  const { email, firstName, lastName, status, checkInDate, checkOutDate, cartItems } = reservation;

  let subject, text;

  if (status === 'approved') {
    subject = 'Your Booking Has Been Approved';
    text = `Dear ${firstName} ${lastName},

We're pleased to inform you that your booking has been approved!

Booking Details:
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Accommodation: ${cartItems[0]?.name || 'N/A'}

We look forward to welcoming you soon!

Best regards,
LuseStay Hotel`;
  } else if (status === 'rejected') {
    subject = 'Update on Your Booking Request';
    text = `Dear ${firstName} ${lastName},

We regret to inform you that we are unable to accommodate your booking request at this time.

Booking Details:
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Accommodation: ${cartItems[0]?.name || 'N/A'}

If you have any questions or would like to explore alternative options, please don't hesitate to contact us.

We apologize for any inconvenience and hope to have the opportunity to serve you in the future.

Best regards,
LuxeStay Hotel`;
  }

  const mailOptions = {
    from: 'luxestayhotel@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  await transporter.sendMail(mailOptions);
};

app.post('/send-booking-email', async (req, res) => {
  const reservation = req.body;

  try {
    await sendBookingStatusEmail(reservation);
    res.status(200).send('Booking status email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});