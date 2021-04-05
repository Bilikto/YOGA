function slides(selectors, prevArrow, nextArrow, dotsParent, dotsSelector, classActive) {
  //Slides
  const slides = document.querySelectorAll(selectors),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    slidesWrap = document.querySelector(dotsParent),
    dots = document.querySelectorAll(dotsSelector);

  let sliderIndex = 1;

  const showSlider = (n) => {
    if (n > slides.length) {
      sliderIndex = 1;
    }

    if (n < 1) {
      sliderIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.style.display = 'none';
    });

    dots.forEach((dot) => {
      dot.classList.remove(classActive);
    });

    slides[sliderIndex - 1].style.display = 'block';
    dots[sliderIndex - 1].classList.add(classActive);
  };

  const plusSlides = (n) => {
    showSlider(sliderIndex += n);
  };

  const currentSlides = (n) => {
    showSlider(sliderIndex = n);
  };

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });

  next.addEventListener('click', () => {
    plusSlides(1);
  });

  slidesWrap.addEventListener('click', (e) => {
    const target = e.target;

    for (let i = 0; i < dots.length + 1; i++) {
      if (target.classList.contains('dot') && target == dots[i - 1]) {
        currentSlides(i);
      }
    }
  });

  showSlider(sliderIndex);
}

export default slides;