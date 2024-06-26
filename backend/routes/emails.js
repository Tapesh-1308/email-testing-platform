const express = require('express');
const router = express.Router();
const { Email, EmailStats } = require('../models/Email');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const config = require('../config');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: config.mailgunData.apiKey});

// Create email
router.post('/createEmail', async (req, res) => {
    const { subject, body, to, from } = req.body;
    try {
        const emailData = {
            from: `Tapesh <${from}@${config.mailgunData.domain}>`,
            to,
            subject,
            html: body,
            'o:tracking-opens': "yes",
			'o:tracking-clicks': "yes"
        };
        const response = await mg.messages.create(config.mailgunData.domain, emailData);
        const newEmail = new Email({ subject, body, to, from, mailgunId: response.id });
        await newEmail.save();

        const stats = await EmailStats.findOne();
        stats.totalCampaigns += 1;
        await stats.save();
        res.status(201).send(newEmail);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all emails
router.get('/getAllEmails', async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get email by ID
router.get('/getEmailById/:id', async (req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) return res.status(404).send('Email not found');
        res.status(200).send(email);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all stats
router.get('/getAllStats', async (req, res) => {
  try {
      const stats = await EmailStats.findOne();
      if (!stats) return res.status(404).send('Stats not found');
      res.status(200).send(stats);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Webhook listener for email analytics
router.post('/webhook', async (req, res) => {
    try {
        const eventData = req.body['event-data'];
        const { event, recipient } = eventData;
        const messageId = `<${eventData.message.headers['message-id']}>`;

        const email = await Email.findOne({ mailgunId: messageId });
        if (!email) return res.status(404).send('Email not found');

        const stats = await EmailStats.findOne();
        if (!stats) return res.status(500).send('EmailStats document not found');

        const updateEmailStats = (type) => {
            if (!email.analytics[type].includes(recipient)) {
                email.analytics[type].push(recipient);
                stats[`total${type.charAt(0).toUpperCase() + type.slice(1)}`] += 1;
            }
        };

        switch (event) {
            case 'delivered':
                updateEmailStats('delivered');
                break;
            case 'opened':
                updateEmailStats('opened');
                break;
            case 'clicked':
                updateEmailStats('clicked');
                break;
            default:
                return res.status(400).send('Unknown event');
        }
        await email.save();
        await stats.save();

        res.status(200).send('Event recorded');
    } catch (error) {
        
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
