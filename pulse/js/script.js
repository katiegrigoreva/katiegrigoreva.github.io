$(document).ready(function(){
   $('.carousel__inner').slick({
      infinite: true,
      slidesToShow: 1,
      speed: 1300,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.png"></button>'
   });

  

   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
         .eq($(this).index()).addClass('catalog__content_active');
   });

   function toggleSlide(item) {
      $(item).each(function(i) {
         $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
         });
      });
   }

   toggleSlide('.catalog-item__link');
   toggleSlide('.catalog-item__back');

   // Modal

   $('[data-modal=consult]').on('click', function() {
      $('.overlay, #consult').fadeIn('slow');
   });
   $('.modal__close').on('click', function() {
      $('.overlay, #consult, #order, #thanks').fadeOut('slow');
   });

   $('.button_mini').each(function(i) {
      $(this).on('click', function() {
         $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
         $('.overlay, #order').fadeIn('slow');
      });    
   });

   // Form validation
   
   function validateForm(form) {
      $(form).validate({
         rules: {
            phone: "required",
            name: "required",
            email: {
               required: true,
               email: true
            }
         },
         messages: {
            name: "Укажите ваше имя",
            phone: "Укажите ваш телефон",
            email: {
              required: "Укажите вашу электронную почту",
              email: "Неправильный адрес электронной почты"
            }
          }   
      });
   }   
   
   validateForm('#consult-form');
   validateForm('#consult form');
   validateForm('#order form');

   // Phone mask

   $('input[name=phone]').mask("+7 (999) 999-99-99");

   // Form submit
   $('form').submit(function(e) {
      e.preventDefault();
      if (!$(this).valid()) {
         return;
      }
      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function() {
         $(this).find("input").val("");
         $('#consult, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');

         $('form').trigger('reset');
      });
      return false;
   });

   //Pageup, smooth scroll

   $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
         $('.pageup').fadeIn();
      } else {
         $('.pageup').fadeOut();
      }
   });

   $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
   });


});

