const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    subject: String,
    body: String,
    to: [String],
    from: String,
    status: {
        type: String,
        default: 'sent'
    },
    analytics: {
        delivered: { type: [String], default: [] },
        opened: { type: [String], default: [] },
        clicked: { type: [String], default: [] }
    },
    mailgunId: String
}, { timestamps: true });

const EmailStatsSchema = new mongoose.Schema({
    totalCampaigns: { type: Number, default: 0 },
    totalSent: { type: Number, default: 0 },
    totalDelivered: { type: Number, default: 0 },
    totalOpened: { type: Number, default: 0 },
    totalClicked: { type: Number, default: 0 }
});

const Email = mongoose.model('Email', EmailSchema);
const EmailStats = mongoose.model('EmailStats', EmailStatsSchema);

module.exports = { Email, EmailStats };
