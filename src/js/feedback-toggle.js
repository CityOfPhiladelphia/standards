module.exports = $(function() {
  $('[data-toggle="feedback"]').click(function() {
    $('[data-type="feedback-form"] iframe').css( 'height', '');
    var formOffset = $('[data-toggle="feedback"]').offset();
    var stickyHeight = $('.sticky-container').outerHeight();
    if ( $('#wpadminbar').length ){
      var wpadminbarHeight = $('#wpadminbar').outerHeight();
    } else {
      var wpadminbarHeight = 0;
    }
    var formPosition = formOffset.top - ( stickyHeight + wpadminbarHeight );

    $('[data-type="feedback-form"] iframe').attr('onload',"window.parent.scrollTo(0," + formPosition + ")");

    if ( $('[data-type="feedback-indicator"]').hasClass('up') ){
      $('[data-type="feedback-form"]').slideToggle( function(){
        $('[data-type="feedback-indicator"]').removeClass('up');
        $('[data-type="feedback-footer"]').toggle();
      });
    } else {
      $('[data-type="feedback-form"]').slideToggle();
      $('[data-type="feedback-indicator"]').addClass('up');
      $('[data-type="feedback-footer"]').toggle();
    }
  });
});
