module.exports = {
  mongoUri: process.env.MONGODB_URI,
  yahooConfig: {
    clientId: process.env.YAHOO_CLIENT_ID,
    clientSecret: process.env.YAHOO_CLIENT_SECRET,
    redirectUri: process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com/auth/callback'
      : 'http://localhost:3000/auth/callback'
  },
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.NODE_ENV === 'production'
    ? 'https://your-domain.com'
    : 'http://localhost:3000'
}; 