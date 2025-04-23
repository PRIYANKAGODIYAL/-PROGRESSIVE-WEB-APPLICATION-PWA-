const express = require('express');
const fs = require('fs');
const webpush = require('web-push');
const path = require('path');
const router = express.Router();

// Web Push Notifications
const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
webpush.setVapidDetails('mailto:your@email.com', publicKey, privateKey);

const subscriptionsFile = path.join(__dirname, '../subscriptions.json');
let subscriptions = [];

if (fs.existsSync(subscriptionsFile)) {
  subscriptions = JSON.parse(fs.readFileSync(subscriptionsFile));
}

// Subscribe for push notifications
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  fs.writeFileSync(subscriptionsFile, JSON.stringify(subscriptions, null, 2));
  res.status(201).json({ message: 'Subscribed successfully' });
});

// Send a test notification
router.post('/send-notification', (req, res) => {
  const payload = JSON.stringify({
    title: '🛍️ New Offer!',
    body: 'Grab 50% OFF for a limited time!',
  });

  subscriptions.forEach(sub => {
    webpush.sendNotification(sub, payload).catch(err => console.error('Notification Error:', err));
  });

  res.json({ message: 'Notifications sent' });
});

module.exports = router;
