const express = require('express');
const donorRoutes = require('./routes/donorRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Blood Donor Finder API is running' });
});

app.use('/api/donors', donorRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
