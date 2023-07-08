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

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach(card => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        searchText.value = '';
    });

    const filter = () => {
        cards.forEach(card => {
            const cardPrice = card.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            const discount = card.querySelector('.card-sale');

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    };

    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
    discountCheckbox.addEventListener('change', filter);
};

// get data

const getData = () => {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then(r => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error('Данные не были получены, ошибка: ' + r.status);
        }
    })
        .then(data => data)
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = `<div>Упс, что-то пошло не так</div>`;
        });
};

// render cards
const renderCards = (data) => {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach(good => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
            <div class="card" data-category="${good.category}">
                ${good.sale ? `<div class="card-sale">🔥Hot Sale🔥</div>` : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top" style="background-image: url(${good.img})"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>`;
        goodsWrapper.appendChild(card);
    });
};

const renderCatalog = () => {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();

    cards.forEach(card => {
        categories.add(card.dataset.category);
    });

    categories.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        catalogWrapper.style.display = catalogWrapper.style.display === 'block' ? 'none' : 'block';

        if (event.target.tagName === 'LI') {
            cards.forEach(card => {
                card.parentNode.style.display = card.dataset.category === event.target.textContent ? 'block' : 'none';
            });
        }
    });
};

getData().then(data => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addingGoodsToCart();
    filterAndSearchOnPage();
    renderCatalog();
});