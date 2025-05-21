// Xử lý ĐĂNG KÝ
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value
    };

    try {
      const res = await fetch('https://downloadfreeyourcv.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      alert(result.message || 'Đăng ký thành công!');
    } catch (error) {
      alert('Đăng ký thất bại. Vui lòng thử lại sau.');
      console.error(error);
    }
  });
}

// Xử lý ĐĂNG NHẬP
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      email: this.email.value,
      password: this.password.value
    };

    try {
      const res = await fetch('https://downloadfreeyourcv.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'Đăng nhập thành công!');
        // 👉 Tùy chọn: chuyển trang nếu cần
        // window.location.href = 'dashboard.html';
      } else {
        alert(result.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      alert('Đăng nhập lỗi. Vui lòng thử lại sau.');
      console.error(error);
    }
  });
}
