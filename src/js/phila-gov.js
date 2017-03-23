module.exports = $(function(){

  /*Globals */
  var navHeight = $('.global-nav').height();
  var currentPath = window.location.pathname;
  var windowWidth = $(window).width();

  //Generic class for links that should prevent clickthrough
  $('.no-link').click(function(e){
    e.preventDefault();
  });

  $('.top-bar').css( 'top', navHeight );

  var translate = setTimeout(function() { $('#google_translate_element a').prepend('<i class="fa fa-globe"></i>'); }, 1000);

  $( $( '.global-nav a' ) ).each( function() {
    if ( currentPath == $( this ).attr('href') || currentPath == $( this ).data( 'link' ) ){

      $(this).addClass('js-is-current');
      //special handling for services
    }else if( currentPath.indexOf('/services/') === 0 ){
      $('.services-menu-link a').addClass('js-is-current');
    }
  });

  /* Provide option for explict show/hide declarations, with jQuery fallbacks for older (ios) browsers */
  function togglePageBody( show ){
    if( show === true ){
      $('#page').show();
      $('#page').removeClass('hide');

      $('footer').show();
      $('footer').removeClass('hide');
      return;
    }

    if( show === false ){

      $('#page').hide();
      $('#page').addClass('hide');

      $('footer').hide();
      $('footer').addClass('hide');
      return;
    }
    $('#page').toggle();
    $('#page').toggleClass('hide');

    $('footer').toggle();
    $('footer').toggleClass('hide');

  }

  /* Drilldown menu */
  $(document).on('toggled.zf.responsiveToggle', '[data-responsive-toggle]', function(){
    var drilldownOptions = {dataAutoHeight: false, dataScrollTop: true};
    var mobileMenu = new Foundation.Drilldown( $('.mobile-nav-drilldown'), drilldownOptions );

    if ( $( '.js-current-section' ).length === 0 ) {
      $('li.js-drilldown-back').after( '<li class="js-current-section" aria-hidden="false"></li>' );
    }
    $('li.js-drilldown-back').attr('tabindex', '1');

    $('.mobile-nav-drilldown li').each( function() {
        $(this).attr('tabindex', '0');
    });

    $('.menu-icon .title-bar-title').text( ( $('.menu-icon .title-bar-title' ).text() == 'Menu' ) ? 'Close' : 'Menu' );

    $('.global-nav .menu-icon').toggleClass('active');

    $('body').removeClass('no-scroll');

    $('.menu-icon i').toggleClass('fa-bars').toggleClass('fa-close');

    /* duplicate aria tags on drilldown parents, to allow full tap on item */
    $('li.is-drilldown-submenu-parent').each(function() {
      var aria = $(this).attr('aria-label');
      $(this).children('a').first().attr('aria-label', aria);
    });

    if($('.mobile-nav-drilldown').is(':visible')){
      togglePageBody(false);

    }else{
      togglePageBody(true);
    }
  });

  var parentLink = ['Main Menu'];

  $(document).on('open.zf.drilldown', '[data-drilldown]', function(){

    $('body').scrollTop('0');

    parentLink.push( $(this).find('.is-active').last().prev().text() );

    $(this).find('.is-active').last().addClass('current-parent');

    $('.current-parent > li.js-drilldown-back a').text( 'Back to ' + parentLink.slice(-2)[0] );

    $('.js-current-section').html( parentLink.slice(-1)[0] );

    /* Ensure no events get through on titles */
    $('.js-current-section').each(function( ) {
      $(this).click(function(e) {
        return false;
      });

    });
    //don't let events bubble up and cause issues on ul click
    $( 'ul.is-active' ).click(function( e ) {
      e.stopPropagation();
    });

    $(this).find('.is-active').attr('aria-hidden', 'false');

    $(this).find('.is-drilldown-submenu').not('.is-active').attr('aria-hidden', 'true');


  });


  $(document).on('hide.zf.drilldown', '[data-drilldown]', function(){
    parentLink.pop();

    $('.current-parent > li.js-drilldown-back a').text( 'Back to ' + parentLink.slice(-2)[0] );

    $('.js-current-section').html( parentLink.slice(-1)[0] );

  });


  $('#services-mega-menu').hover( function(){
    $( '.site-search i' ).addClass('fa-search').removeClass('fa-close');

  }, function(){
    $('body').removeClass('no-scroll');
    $( '.site-search i' ).addClass('fa-search').removeClass('fa-close');

  });


  function resetLayout(){
    togglePageBody( true );
    $('.menu-icon i').addClass('fa-bars').removeClass('fa-close');
    $('.menu-icon .title-bar-title').text('Menu');
    $('.menu-icon').removeClass('active');

    $('#services-mega-menu').foundation('close');

    $('body').removeClass('no-scroll');

    if ( $('.is-drilldown').is(':visible') ) {
      $('.title-bar').foundation('toggleMenu');
    }
  }


  function resetScroll(){
    $('#page').click( function() {
      $('body').removeClass('no-scroll');
      $( '.site-search i' ).addClass('fa-search').removeClass('fa-close');
    });

    $('footer').click( function() {
      $('body').removeClass('no-scroll');
      $( '.site-search i' ).addClass('fa-search').removeClass('fa-close');
    });

    $(document).keyup(function(e) {
      //on escape, also remove no-scroll
      if (e.keyCode == 27) {
        $('body').removeClass('no-scroll');
        if ( $('.is-drilldown').is(':visible') ) {
          $('.title-bar').foundation('toggleMenu');
          togglePageBody(true);
        }
      }
    });
  }

  function checkBrowserHeight( navHeight ){
    if ( $('body').hasClass('logged-in') ) {
      return;
    }

    var wh = window.innerHeight;

    var sh = $('#services-mega-menu').innerHeight();

    sh = sh + navHeight;

    if ( $('.sticky').hasClass('is-stuck') ){
      navHeight = $('.sticky-container').height();
    }

    if ( wh <= sh ) {
      $('#services-mega-menu').css({
        'position': 'absolute',
        'top': 0
      });

      togglePageBody( false );
      $('body').removeClass('no-scroll');

    }else{

      togglePageBody( true );
      $('body').addClass('no-scroll');

    }

  }

  /* Mega menu Dropdown */

  $('#services-mega-menu').on('show.zf.dropdown', function() {

    $('#back-to-top').css('display', 'none');

    checkBrowserHeight( navHeight );
  });


  //click and hover handler for desktop service menu link

  $('.services-menu-link').on('click mouseover', function () {
    $( '.site-search i' ).addClass('fa-search').removeClass('fa-close');
  });


  /* All dropdowns */

  $(document).on('hide.zf.dropdown', '[data-dropdown]', function() {
    togglePageBody( true );
    $('body').removeClass('no-scroll');
  });


  /* Site search dropdown */

  $('.site-search-dropdown').on('show.zf.dropdown', function(){
    if ( $('.is-drilldown').is(':visible') ) {

      $('.title-bar').foundation('toggleMenu');
      togglePageBody(true);

    }

    $( '.site-search i' ).addClass('fa-close').removeClass('fa-search');

    $('.site-search span').text( ( $('.site-search span' ).text() == 'Search' ) ? 'Close' : 'Search' );

    $('body').addClass('no-scroll');

    if ( $('.sticky').hasClass('is-stuck') ){
      navHeight = $('.sticky-container').height();
    }

    $(this).css('top', navHeight);

  });

  $('.site-search-dropdown').on('hide.zf.dropdown', function() {
    $( '.site-search i' ).removeClass('fa-close').addClass('fa-search');
    $('.site-search span').text('Search');
  });


  function drilldownMenuHeight(){
    if (Foundation.MediaQuery.current == 'small') {
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      var drilldownHeight = $('.global-nav .is-drilldown').outerHeight();
      var singleHeight = $('.global-nav .is-drilldown li').outerHeight() + 10;
      $('.global-nav .is-drilldown ul').css({
        'height': drilldownHeight +  singleHeight + 'px'
      });
    }
  }


  $( window ).resize(function() {

    //check window width for mobile devices to prevent window resize on scroll.
    if ($(window).width() != windowWidth) {
      windowWidth = $(window).width();

      checkBrowserHeight( navHeight ) ;

      if (Foundation.MediaQuery.atLeast('medium')) {
        //$('.sticky:visible').foundation('_calc', true);
        resetLayout();
      }
    }
    $(window).bind('orientationchange', function(e){

      resetLayout();

    });

    //orientation doesn't matter, always remove the no-scroll class
    $('body').removeClass('no-scroll');

  });


  /* prevent search dropdown from becoming dissconnected from header when keyboard is closed on iOS devices */

  $('.search-field').focusout(function() {
    if ( Foundation.MediaQuery.current == 'small' ) {
      window.scrollTo(0, 0);
    }
  });



  resetScroll();

  //prevent enter from refreshing the page and stopping filter search

  $('#filter-list input').keypress(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });


  $('.clickable-row').click(function() {
    window.location = $(this).data('href');
  });

  $('.clickable-row').hover(function() {
      $(this).addClass('is-hover');
    },
    function(){
      $(this).removeClass('is-hover');
  });

  // Staff summary expand
  $('[data-toggle="data-staff-bio"]').click(function(e){
    e.preventDefault();
    $(this).parent().siblings().toggleClass('expandable');
    if($(this).html() === ' Expand + '){
      $(this).html(' Collapse - ');
    } else {
      $(this).html(' Expand + ');
    }
  });

  //foundation equalizer rows
  //doesn't work with nested Equalizers, because a unique ID is required.
  if ( $('.equal').length > 0 ) {

    //equalizeByRow: true to force each instance of equalizer to work individually
    var equalizerOptions = {
      equalizeOnStack: true,
      equalizeByRow: true,
      equalizeOn: 'small'
    };

    $('.equal-height').each( function() {
      $(this).find('.equal').attr('data-equalizer-watch','');
    });

    var equalHeight = new Foundation.Equalizer($ ('.equal-height'), equalizerOptions );

  }

  //foundation tooltips
  if ($('.has-tip').length > 0) {

    var tooltip = new Foundation.Tooltip( $('.has-tip') );

  }

});
