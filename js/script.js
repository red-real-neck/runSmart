$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeaight: true,
        prevArrow: `<button type="button" class="slick-prev"> <img src="../icons/chevron-left-solid.svg"></button>`,
        nextArrow: `<button type="button" class="slick-next"><img src="../icons/chevron-right-solid.svg"></button>`,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    //modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consulting').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consulting').fadeOut();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.page-up').fadeIn();
        } else {
            $('.page-up').fadeOut();
        }
    });

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json));
});

