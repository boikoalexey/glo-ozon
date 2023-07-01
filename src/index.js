// checkbox
const invisibleCheckbox = document.getElementById('discount-checkbox');
const visibleCheckbox = document.querySelector('.filter-check_checkmark');

invisibleCheckbox.addEventListener('change', () => {
    visibleCheckbox.classList.toggle('checked');
})

// cart
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});

// adding goods to cart

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');

const getCountGoodsInCart = () => {
    const cardsToCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsToCart.length.toString();
}

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        getCountGoodsInCart();
    });
});

