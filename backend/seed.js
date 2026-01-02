// backend/seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const hashedSidebar = await bcrypt.hash('admin123', 10);
    await User.create({ username: 'admin', password: hashedSidebar });
    console.log("✅ Admin User Created: user: admin, pass: admin123");
    process.exit();
});