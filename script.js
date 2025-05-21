// ======================
// XỬ LÝ ĐĂNG KÝ NGƯỜI DÙNG
// ======================
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullname = this.fullname.value;
    const email = this.email.value;
    const password = this.password.value;

    try {
      const res = await fetch('https://downloadfreeyourcv.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const result = await res.json();

      if (res.ok || result.message === 'Đăng ký thành công!') {
        alert(result.message || 'Đăng ký thành công!');
        window.location.href = 'login.html';
      } else {
        alert(result.message || 'Đăng ký thất bại!');
      }
    } catch (error) {
      alert('Đăng ký lỗi. Vui lòng thử lại sau.');
      console.error('Đăng ký lỗi:', error);
    }
  });
}

// ======================
// XỬ LÝ ĐĂNG NHẬP NGƯỜI DÙNG
// ======================
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = this.email.value;
    const password = this.password.value;

    try {
      const res = await fetch('https://downloadfreeyourcv.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await res.json();

      if (res.ok || result.message === 'Đăng nhập thành công!') {
        alert(result.message || 'Đăng nhập thành công!');
        
        // ✅ Lưu thông tin người dùng vào localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(result.user));

        // ✅ Chuyển đến dashboard
        window.location.href = 'dashboard.html';
      } else {
        alert(result.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      alert('Đăng nhập lỗi. Vui lòng thử lại sau.');
      console.error('Đăng nhập lỗi:', error);
    }
  });
}

// ======================
// XỬ LÝ NHẬP THÔNG TIN CÁ NHÂN
// ======================
const infoForm = document.getElementById('info-form');
if (infoForm) {
  infoForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fullname = this.fullname.value;
    const email = this.email.value;
    const phone = this.phone.value;

    try {
      const res = await fetch('https://downloadfreeyourcv.onrender.com/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, phone })
      });

      const result = await res.json();

      if (res.ok || result.message === 'Lưu thông tin thành công!') {
        alert(result.message || 'Lưu thành công!');

        // ✅ Lưu thông tin vào localStorage để dùng cho apply-template
        localStorage.setItem('userInfo', JSON.stringify({ fullname, email, phone }));

        window.location.href = 'template-list.html';
      } else {
        alert(result.message || 'Không thể lưu thông tin!');
      }
    } catch (error) {
      alert('Lỗi khi lưu thông tin cá nhân.');
      console.error('Lỗi info:', error);
    }
  });
}
