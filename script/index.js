import {homeCards} from '../data/homeData.js';

let currentSlide = 0;

const slide = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function showSlide() {
    slide.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide++;

    showSlide();

    if (currentSlide === totalSlides - 1) {
        setTimeout(() => {
            slide.style.transition = 'none';
            currentSlide = 0;
            showSlide();

            setTimeout(() => {
                slide.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
}

function prevSlide() {
    if (currentSlide === 0) {
        slide.style.transition = 'none';
        currentSlide = totalSlides - 1;
        showSlide();

        setTimeout(() => {
            slide.style.transition = 'transform 0.5s ease-in-out';
            currentSlide--;
            showSlide();
        }, 50);
    } else {
        currentSlide--;
        showSlide();
    }
}
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

const scrollBars = document.querySelectorAll('.products');

scrollBars.forEach((item) => {
    item.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        item.scrollLeft += evt.deltaY;
    });
});

const homeCardsContainer = document.getElementById("home-cards");

function generateHomeCards() {

    homeCardsContainer.innerHTML = "";

    homeCards.forEach((card, index) => {

        if (index % 4 === 0) {

            const grid = document.createElement("div");

            grid.classList.add("product-grid");

            if (index >= 4) {
                grid.classList.add("second-grid");
            }

            homeCardsContainer.appendChild(grid);
        }

        const grids = homeCardsContainer.querySelectorAll(".product-grid");
        const currentGrid = grids[grids.length - 1];

        if (card.type === "single") {

            const cardElement = document.createElement("div");

            cardElement.classList.add("product-card");

            cardElement.innerHTML = `
                <strong>${card.title}</strong>

                <img src="${card.image}" alt="${card.title}">

                <p>${card.linkText}</p>
            `;

            currentGrid.appendChild(cardElement);
        }

        else if (card.type === "grid") {

            const cardElement = document.createElement("div");

            cardElement.classList.add("product-card");

            cardElement.innerHTML = `
                <strong>${card.title}</strong>

                <div class="product-picture">

                    ${card.items.map(item => `
                        <div class="picture1">

                            <img src="${item.image}" alt="${item.text}">

                            <p>${item.text}</p>

                        </div>
                    `).join("")}

                </div>

                <p>${card.linkText}</p>
            `;

            currentGrid.appendChild(cardElement);
        }

    });
}

generateHomeCards();