const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// === Mô hình User (đăng ký / đăng nhập)
const User = mongoose.model('User', {
  fullname: String,
  email: String,
  password: String
});

// === Mô hình Info (Thông tin cá nhân)
const Info = mongoose.model('Info', {
  fullname: String,
  email: String,
  phone: String
});

// ✅ API đăng ký
app.post('/register', async (req, res) => {
  console.log("📥 req.body:", req.body);
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    console.log("❗ Thiếu dữ liệu đầu vào!");
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("⚠️ Email đã tồn tại:", email);
    return res.json({ message: 'Email đã tồn tại.' });
  }

  const newUser = new User({ fullname, email, password });
  await newUser.save();

  console.log("✅ Đăng ký thành công:", newUser);
  res.json({ message: 'Đăng ký thành công!' });
});

// ✅ API đăng nhập
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Yêu cầu đăng nhập:", { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log("❌ Tài khoản không tồn tại:", email);
    return res.status(401).json({ message: 'Tài khoản không tồn tại.' });
  }

  if (user.password !== password) {
    console.log("❌ Sai mật khẩu cho:", email);
    return res.status(401).json({ message: 'Sai mật khẩu.' });
  }

  console.log("✅ Đăng nhập thành công:", user.email);
  res.json({ message: 'Đăng nhập thành công!', user });
});

// ✅ API lưu thông tin cá nhân
app.post('/info', async (req, res) => {
  const { fullname, email, phone } = req.body;
  console.log("📄 Nhận thông tin cá nhân:", { fullname, email, phone });

  if (!fullname || !email) {
    return res.status(400).json({ message: 'Thiếu họ tên hoặc email' });
  }

  const newInfo = new Info({ fullname, email, phone });
  await newInfo.save();

  console.log("✅ Lưu thông tin cá nhân thành công:", newInfo);
  res.json({ message: 'Lưu thông tin thành công!' });
});

// ✅ Khởi động server
app.listen(3000, () => console.log('🚀 Server chạy tại http://localhost:3000'));
