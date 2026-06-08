const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-cart');

cartBtn.onclick = () => cartModal.style.display = 'block';
closeBtn.onclick = () => cartModal.style.display = 'none';

// بستن با کلیک خارج از باکس
window.onclick = (event) => {
  if (event.target == cartModal) cartModal.style.display = 'none';
};

// تابعی برای به‌روزرسانی لیست (این را هر زمان محصولی اضافه شد صدا بزن)
function updateCartUI(items) {
  const list = document.getElementById('cart-items');
  list.innerHTML = items.map(item => `<li>${item.name} - ${item.price}</li>`).join('');
}
