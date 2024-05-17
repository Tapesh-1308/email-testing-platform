module.exports = {
  mongoURI: process.env.MONGODB_URI, 
  mailgunData: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
  }
};