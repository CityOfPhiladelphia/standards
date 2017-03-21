module.exports = $(function(){
  /* Async loaded feedback forms */
  $.fn.feedbackify = function( src ) {
    postscribe('#form-container', '<script  type="text/javascript" src="' + src + '"><\/script>');
    $('html,body').animate({
        scrollTop: $('.feedback').position().top - $('header .is-stuck').height()
      }, 700 );
    return false;
  };

  $("footer .feedback").on('click', function(){
    $(this).feedbackify('https://form.jotform.com/jsform/62765090493967');
  });

});
