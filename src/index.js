// checkbox

const toggleCheckbox = () => {
    const invisibleCheckbox = document.getElementById('discount-checkbox');
    const visibleCheckbox = document.querySelector('.filter-check_checkmark');

    invisibleCheckbox.addEventListener('change', () => {
        visibleCheckbox.classList.toggle('checked');
    });
};

// cart

const toggleCart = () => {
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
};

// adding goods to cart

const addingGoodsToCart = () => {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');

    const getCountAndTotalGoodsInCart = () => {
        const cardsToCart = cartWrapper.querySelectorAll('.card');
        countGoods.textContent = cardsToCart.length.toString();

        const cartTotal = document.querySelector('.cart-total span');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        let resultSum = 0;

        cardsPrice.forEach(card => resultSum += parseFloat(card.textContent));
        cartTotal.textContent = resultSum;

        cartEmpty.style.display = cardsToCart.length > 0 ? 'none' : 'block';
    };

    cards.forEach(card => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            getCountAndTotalGoodsInCart();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.style.backgroundColor = 'red';
            removeBtn.style.border = 'red';

            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                getCountAndTotalGoodsInCart();
            });
        });
    });
};

// filter sale

const filterAndSearchOnPage = () => {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('change', () => {
        cards.forEach(card => {
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = 'block';
            }
        });
    });

    const filterPrice = () => {
        cards.forEach(card => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = 'block';
            }
        });
    };

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach(card => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = 'block';
            }
        });
    });

};

toggleCheckbox();
toggleCart();
addingGoodsToCart();
filterAndSearchOnPage();