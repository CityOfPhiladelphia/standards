module.exports = $(function(){
  if (Foundation.MediaQuery.atLeast('medium')) {
    if ( $('#back-to-top').length ) {
      var scrollTrigger = 100, // px
        backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('show');
          } else {
            $('#back-to-top').removeClass('show');
          }
        };

      backToTop();

      $(window).on('scroll', function () {
        backToTop();
        if ( $('#full-footer-start').offset().top < $(this).height() + $(this).scrollTop() ){
          $('#back-to-top').removeClass('show');
        }

      });

      $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 700);
      });
    }
  }
});
