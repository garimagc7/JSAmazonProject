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
