module.exports = $(function(){
  //inspired by https://github.com/smasala/responsive-tables-js

  function titleLables( content ) {
    return "<b><span class='responsive-label'>" + content + ": </span></b>";
  }
  //TODO: create vertical table option
  var tables = $( "table.responsive" );

  if ( tables.length > 0 ) {
    tableCount = tables.length;
    for ( var i = 0; i < tableCount; i++ ) {
      table = $( tables[ i ] );

      //find the rows
      trs = table.find( "> thead > tr, > tbody > tr, > tr" );

      //pick out headings
      ths = trs.find( "> th" );

      trCount = trs.length;

      for ( var j = 0; j < trCount; j++ ) {
        //find cells
        tds = $( trs[ j ] ).find( "> td" );

        tdCount = tds.length;

        for ( var k = 0; k < tdCount; k++ ) {
          //headings in order
          th = ths[ k ];

          //put tds into object so we can inject titleLables
          if ( tds.innerText ) {
            tableCell = $( tds[ k ] );
            //get the text of the table headings
            text = th.textContent || th.innerText || "";
          }else{
            tableCell = $( tds[ '' ] );
            text = '';
          }

          //prepend td with the heading
          td = tableCell.prepend( titleLables( text ) );
        }
      }
    }
  }

  var hiddenCols = $( "table.js-hide-empty" );

  if ( hiddenCols.length > 0 ) {
    $("th", hiddenCols).each(function(i) {
      var remove = 0;
      var tds = $(this).parents('table').find('tr td:nth-child(' + (i + 1) + ')');
      tds.each(function(j) {
        if (this.innerHTML == '') remove++;
      });
      if ( remove == ($('tr', hiddenCols).length - 1) ) {
        $(this).hide();
        tds.hide();
      };
    });
  }

});
