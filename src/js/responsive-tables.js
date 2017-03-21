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
          tableCell = $( tds[ k ] );

          //get the text of the table headings
          text = th.textContent || th.innerText || "";

          //prepend td with the heading
          td = tableCell.prepend( titleLables( text ) );
        }
      }
    }
  }

});
