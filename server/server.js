// server.js
const express = require('express');
const connectDB = require('./config/db');
const devuserRoutes = require('./routes/devuserRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/api/user', devuserRoutes);
app.use('/api/review', reviewRoutes);

app.get('/', (req, res) => res.send('Hello world!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
