const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ────────────────────────────────────────────────────────────────────
// In production, restrict to your actual frontend domain via CLIENT_URL env var.
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : null;
const allowedOrigins = clientUrl
  ? [clientUrl, 'http://localhost:5173']
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
  },
  credentials: true
}));

// ── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '100kb' }));   // Reject oversized payloads
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ── Rate Limiters ─────────────────────────────────────────────────────────────

// General API limiter: 200 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please wait and try again.' }
});

// Strict limiter for code execution: 30 runs per 15 minutes per IP
const executionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Submission rate limit reached. Please wait before submitting again.' }
});

app.use('/api', generalLimiter);
app.use('/api/submissions', executionLimiter);

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.status(200).json({
      status: 'UP',
      timestamp: result.rows[0].now,
      database: 'CONNECTED'
    });
  } catch (error) {
    res.status(500).json({
      status: 'DOWN',
      error: error.message
    });
  }
});

// ── Routers ───────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/submissions', require('./routes/submissions'));
app.use('/api/dashboard', require('./routes/dashboard'));

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.path}` });
});

// ── Centralized Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  // Don't expose internal error details in production
  const isDev = process.env.NODE_ENV !== 'production';
  console.error('Express Error Handler caught:', isDev ? err.stack : err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: isDev ? (err.message || 'Internal Server Error') : 'Internal Server Error'
  });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` PatternCode API Server is running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});
