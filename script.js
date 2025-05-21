// Placeholder JavaScript
console.log('Script loaded');
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = {
    fullname: this.fullname.value,
    email: this.email.value,
    password: this.password.value
  };

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await res.json();
  alert(result.message || 'Đăng ký thành công!');
});
