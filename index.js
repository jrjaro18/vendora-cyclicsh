const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

// Import the database connection
require('./database');

// ======= Global Middleware =======
const app = express();

const corsOptions = {
  origin: 'https://vendora.cyclic.app/',
  credentials: true, // Enable sending cookies
};
app.use(cors(corsOptions));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// ======= Routes =======
const userRoutes = require('./routes/userRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/user', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/product', productRoutes);

// ======= Server Setup =======
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const jwtVerify = require('./middlewares/verifyjwt');
// app.get("/api/products",jwtVerify,(req,res)=>{
//   res.send("hello");
// })

// app.get("/api/check/authorized", jwtVerify, (req, res) => {
//   res.send("authorized");
// })