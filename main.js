// ======================
// SWIPER SLIDER
// ======================

const swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});

// ======================
// PRODUCT DATA
// ======================

const products = [
    {
        id: 1,
        name: "Double Beef Burger",
        price: 12.00,
        image: "Image/burger.png"
    },
    {
        id: 2,
        name: "Fried Chicken Basket",
        price: 15.50,
        image: "Image/fried-chicken.png"
    },
    {
        id: 3,
        name: "Cheesy Veg Pizza",
        price: 10.00,
        image: "Image/pizza.png"
    },
    {
        id: 4,
        name: "Chicken Roll",
        price: 8.50,
        image: "Image/chicken-roll.png"
    }
];

// ======================
// VARIABLES
// ======================

let cart = [];

// ======================
// DOM ELEMENTS
// ======================

const cardList = document.querySelector(".card-list");
const cartValue = document.querySelector(".cart-value");

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");

const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

// ======================
// LOAD PRODUCTS
// ======================

function loadMenu() {

    if (!cardList) return;

    cardList.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("order-card");

        card.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h4>${product.name}</h4>

            <h4 class="price">$${product.price.toFixed(2)}</h4>

            <button class="btn add-cart-btn" data-id="${product.id}">
                Add To Cart
            </button>
        `;

        cardList.appendChild(card);
    });

    attachCartButtons();
}

// ======================
// ATTACH BUTTON EVENTS
// ======================

function attachCartButtons() {

    const buttons = document.querySelectorAll(".add-cart-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);

            addToCart(id);
        });
    });
}

// ======================
// ADD TO CART
// ======================

function addToCart(id) {

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        const product = products.find(
            product => product.id === id
        );

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// ======================
// UPDATE CART
// ======================

function updateCart() {

    updateCartCount();
    updateCartUI();
}

// ======================
// UPDATE CART COUNTER
// ======================

function updateCartCount() {

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    if (cartValue) {
        cartValue.textContent = totalItems;
    }
}

// ======================
// UPDATE CART UI
// ======================

function updateCartUI() {

    if (!cartList || !cartTotal) return;

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const div = document.createElement("div");

        div.style.borderBottom = "1px solid #ddd";
        div.style.padding = "10px 0";

        div.innerHTML = `
            <h4>${item.name}</h4>

            <p>
                Qty: ${item.quantity}
            </p>

            <p>
                $${(item.price * item.quantity).toFixed(2)}
            </p>
        `;

        cartList.appendChild(div);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// ======================
// OPEN CART
// ======================

if (cartIcon && cartTab) {

    cartIcon.addEventListener("click", (e) => {

        e.preventDefault();

        cartTab.classList.add("active");
    });
}

// ======================
// CLOSE CART
// ======================

if (closeBtn && cartTab) {

    closeBtn.addEventListener("click", () => {

        cartTab.classList.remove("active");
    });
}

// ======================
// MOBILE MENU
// ======================

if (hamburger && mobileMenu) {

    hamburger.addEventListener("click", (e) => {

        e.preventDefault();

        mobileMenu.classList.toggle("active");
    });
}

// ======================
// INITIALIZE
// ======================

loadMenu();