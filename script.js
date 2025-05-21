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

      if (res.ok) {
        alert(result.message || 'Đăng ký thành công!');
        // ✅ Chuyển sang trang đăng nhập
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

      if (res.ok) {
        alert(result.message || 'Đăng nhập thành công!');
        // ✅ Sau khi đăng nhập thành công → chuyển đến menu chính
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
