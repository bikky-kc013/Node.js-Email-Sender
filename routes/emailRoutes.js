const express=require("express");
const router=express.Router();
const nodemailer = require("nodemailer");
const { transporter }= require("../services/transporter");


//This is the route for sending the email
router.post('/sendEmail', (req, res) => {
    const { to, subject, text } = req.body;
  
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send(`Congratulation buddy email successfully sent to ${to} `);
    });
  });


  module.exports= { router };