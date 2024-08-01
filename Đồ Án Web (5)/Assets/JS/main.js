/**
 * Testimonials slider
 */
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

/**
 * Menu slider
 */
$(document).ready(function () {
  $("#slider-product").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Previous" type="button">‹</button>',
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Next" type="button">›</button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
