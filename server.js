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

const User = mongoose.model('User', {
  fullname: String,
  email: String,
  password: String
});

app.post('/register', async (req, res) => {
  console.log("📥 Dữ liệu nhận được:", req.body);

  const { fullname, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: 'Email đã tồn tại.' });

  const newUser = new User({ fullname, email, password });
  await newUser.save();

  res.json({ message: 'Đăng ký thành công!' });
});

app.listen(3000, () => console.log('🚀 Server chạy tại http://localhost:3000'));
