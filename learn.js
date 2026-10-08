const buttons = document.querySelectorAll(".btn");

const cartItems = document.querySelector(".cart-items");

const checkoutCartItems = document.getElementById("checkout-cart-items");

const cartCount = document.querySelector(".cart-count");

const cartTotalPrice = document.getElementById("cart-total-price");

const searchInput = document.querySelector(".search-input");

const products = document.querySelectorAll(".photo-card");

const checkoutButton = document.querySelector(".checkout-btn");

const orderTotalPrice = document.getElementById("order-total-price");

const submitOrder = document.querySelector(".submit-order");

const orderName = document.querySelector('.order-form input[type="text"]');

const orderPhone = document.querySelector('.order-form input[type="tel"]');

const orderAddress = document.querySelector(".order-form textarea");

const orderPayment = document.querySelector(".order-form select");

const successModal = document.querySelector(".success-modal");

const successClose = document.querySelector(".success-close");

let cart = JSON.parse(localStorage.getItem("cart")) || [];



// اضافه کردن محصول به سبد خرید

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;

        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }

        updateCart();

         button.classList.add("added");

          button.textContent = "✓";

          setTimeout(() => {

             button.classList.remove("added");

             button.textContent = "+";

        }, 500);

    });

});



// بروزرسانی سبد خرید

function updateCart() {

    let totalCount = 0;

    let totalPrice = 0;



    cart.forEach(item => {

        totalCount += item.quantity;

        totalPrice += item.price * item.quantity;

    });



    // سبد خرید index.html

    if (cartItems) {

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            const li = document.createElement("li");

            li.innerHTML = `

                <span>

                    ${item.name} — ${item.price.toLocaleString()} تومان

                </span>

                <div>

                    <button class="minus">−</button>

                    <span>${item.quantity}</span>

                    <button class="plus">+</button>

                </div>

            `;



            li.querySelector(".plus").addEventListener("click", () => {

                item.quantity++;

                updateCart();

            });



            li.querySelector(".minus").addEventListener("click", () => {

                item.quantity--;

                if (item.quantity <= 0) {

                    cart.splice(index, 1);

                }

                updateCart();

            });



            cartItems.appendChild(li);

        });

    }



    // سبد خرید checkout.html

    if (checkoutCartItems) {

        checkoutCartItems.innerHTML = "";



        cart.forEach((item, index) => {

            const li = document.createElement("li");

            li.innerHTML = `

                <div>

                    <strong>${item.name}</strong>

                    <span>

                        ${item.price.toLocaleString()} تومان

                    </span>

                </div>



                <div>

                    <button class="checkout-minus">−</button>

                    <span>${item.quantity}</span>

                    <button class="checkout-plus">+</button>

                    <button class="checkout-remove">

                        حذف

                    </button>

                </div>

            `;



            // افزایش تعداد

            li.querySelector(".checkout-plus")

                .addEventListener("click", () => {

                    item.quantity++;

                    updateCart();

                });



            // کاهش تعداد

            li.querySelector(".checkout-minus")

                .addEventListener("click", () => {

                    item.quantity--;

                    if (item.quantity <= 0) {

                        cart.splice(index, 1);

                    }

                    updateCart();

                });



            // حذف کامل محصول

            li.querySelector(".checkout-remove")

                .addEventListener("click", () => {

                    cart.splice(index, 1);

                    updateCart();

                });



            checkoutCartItems.appendChild(li);

        });

    }



    // تعداد کل محصولات

    if (cartCount) {

        cartCount.textContent = totalCount;

    }



    // مبلغ سبد خرید

    if (cartTotalPrice) {

        cartTotalPrice.textContent =

            totalPrice.toLocaleString();

    }



    // مبلغ نهایی checkout

    if (orderTotalPrice) {

        orderTotalPrice.textContent =

            totalPrice.toLocaleString() + " تومان";

    }



    // ذخیره اطلاعات

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    localStorage.setItem(

        "cartTotal",

        totalPrice

    );

}



// جستجوی محصولات و فیلتر دسته‌بندی

const categoryButtons = document.querySelectorAll(".categories a");

let selectedCategory = "all";

if (categoryButtons.length > 0) {
    categoryButtons[0].classList.add("active");
}


categoryButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});



if (searchInput) {

    searchInput.addEventListener("input", () => {

        filterProducts();

    });

}



function filterProducts() {

    const searchText = searchInput

        ? searchInput.value.trim().toLowerCase()

        : "";



    products.forEach(product => {

        const image = product.querySelector("img");



        const productName = image

            ? image.getAttribute("title").toLowerCase()

            : "";



        const productCategory = product.dataset.category;



        const categoryMatch =

            selectedCategory === "all" ||

            productCategory === selectedCategory;



        const searchMatch =

            productName.includes(searchText);



        if (categoryMatch && searchMatch) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}



// دکمه نهایی کردن خرید

if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("سبد خرید شما خالی است!");

            return;

        }



        localStorage.setItem(

            "cart",

            JSON.stringify(cart)

        );



        window.location.href = "checkout.html";

    });

}



// ثبت سفارش

if (submitOrder) {

    submitOrder.addEventListener("click", () => {

        const name = orderName.value.trim();

        const phone = orderPhone.value.trim();

        const address = orderAddress.value.trim();

        const payment = orderPayment.value;



        if (cart.length === 0) {

            alert("سبد خرید شما خالی است!");

            return;

        }



        if (name === "") {

            alert(

                "لطفاً نام و نام خانوادگی را وارد کنید."

            );

            orderName.focus();

            return;

        }



        if (!/^09\d{9}$/.test(phone)) {

            alert("لطفاً یک شماره تلفن معتبر وارد کنید.");

            orderPhone.focus();

            return;

        }



        if (address === "") {

            alert(

                "لطفاً آدرس خود را وارد کنید."

            );

            orderAddress.focus();

            return;

        }



        if (payment === "") {

            alert(

                "لطفاً روش پرداخت را انتخاب کنید."

            );

            orderPayment.focus();

            return;

        }



        if (successModal) {

            successModal.style.display = "flex";

        }

    });

}



// بستن پیام موفقیت

if (successClose) {

    successClose.addEventListener("click", () => {

        if (successModal) {

            successModal.style.display = "none";

        }



        cart = [];



        localStorage.removeItem("cart");

        localStorage.removeItem("cartTotal");



        updateCart();



        if (orderName) {

            orderName.value = "";

        }



        if (orderPhone) {

            orderPhone.value = "";

        }



        if (orderAddress) {

            orderAddress.value = "";

        }



        if (orderPayment) {

            orderPayment.selectedIndex = 0;

        }

    });

}



// منوی سایت

const menuToggle =

    document.getElementById("menu-toggle");



const menu =

    document.querySelector(".menu-items");



if (menuToggle && menu) {

    document.addEventListener("mouseover", (event) => {

        if (

            menuToggle.checked &&

            !menu.contains(event.target) &&

            !event.target.closest(".menu-trigger")

        ) {

            menuToggle.checked = false;

        }

    });

}



// نام کاربر

localStorage.setItem(

    "username",

    "Mohammad"

);



const username =

    localStorage.getItem("username");



console.log(username);



// اجرای اولیه

updateCart();

const bestSellersTrack = document.querySelector(".best-sellers-track");
const bestSellersPrev = document.querySelector(".best-sellers-btn.prev");
const bestSellersNext = document.querySelector(".best-sellers-btn.next");

if (bestSellersTrack) {

    let bestSellersInterval;

    function startBestSellers() {
        bestSellersInterval = setInterval(() => {

            bestSellersTrack.scrollLeft -= 1;

            if (
                Math.abs(bestSellersTrack.scrollLeft) >=
                bestSellersTrack.scrollWidth - bestSellersTrack.clientWidth
            ) {
                bestSellersTrack.scrollLeft = 0;
            }

        }, 30);
    }

    function stopBestSellers() {
        clearInterval(bestSellersInterval);
    }

    bestSellersPrev.addEventListener("click", () => {
        bestSellersTrack.scrollBy({
            left: 180,
            behavior: "smooth"
        });
    });

    bestSellersNext.addEventListener("click", () => {
        bestSellersTrack.scrollBy({
            left: -180,
            behavior: "smooth"
        });
    });

    bestSellersTrack.addEventListener("mouseenter", stopBestSellers);
    bestSellersTrack.addEventListener("mouseleave", startBestSellers);

    startBestSellers();
}