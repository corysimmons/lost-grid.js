// lost-grid.js

$(function() {

  var lost = {
    gutter: 0,
    breakpoint: 1000,
    rtl: false
  };

  // center
  $('[l-center]').each(function(k) {
    if($(this).attr('l-center') > 0) {
      document.styleSheets[0].insertRule('[l-center]:nth-of-type('+ (k + 1) +') { max-width: '+ lost.breakpoint +'px; margin-left: auto; margin-right: auto; padding-left: '+ $(this).attr('l-center') +'px; padding-right: '+ $(this).attr('l-center') +'px; }', 0);
    } else {
      document.styleSheets[0].insertRule('[l-center]:nth-of-type('+ (k + 1) +') { max-width: '+ lost.breakpoint +'px; margin-left: auto; margin-right: auto; }', 0);
    }
  });

  // row
  document.styleSheets[0].insertRule('[l-row] { *zoom: 1; margin-left: '+ (lost.gutter / 2 * -1) +'px; margin-right: '+ (lost.gutter / 2 * -1) +'px; }', 0);
  document.styleSheets[0].insertRule('[l-row]:before { content: ""; display: table; }', 0);
  document.styleSheets[0].insertRule('[l-row]:after { content: ""; display: table; clear: both; }', 0);

  // column
  if(!lost.rtl) {
    document.styleSheets[0].insertRule('[l-column] { float: left; }', 0);
  } else {
    document.styleSheets[0].insertRule('[l-column] { float: right; }', 0);
  }
  $('[l-column]').each(function(k) {

    // offset
    if($(this).attr('l-offset')) {
      if(lost.gutter > 0) {
        if(parseInt($(this).attr('l-offset')) > 0) {
          document.styleSheets[0].insertRule('[l-offset]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-right: '+ (lost.gutter / 2) +'px; margin-left: calc(100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2)); }', 0);
        } else {
          document.styleSheets[0].insertRule('[l-offset]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-left: '+ (lost.gutter / 2) +'px; margin-right: calc(-100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2)); }', 0);
        }
      } else {
        if(parseInt($(this).attr('l-offset')) > 0) {
          document.styleSheets[0].insertRule('[l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); margin-left: calc(100% * '+ $(this).attr('l-offset') +'); }', 0);
        } else {
          document.styleSheets[0].insertRule('[l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); margin-right: calc(-100% * '+ $(this).attr('l-offset') +'); }', 0);
        }
      }
    } else {
      if(lost.gutter > 0) {
        document.styleSheets[0].insertRule('[l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
      } else {
        document.styleSheets[0].insertRule('[l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); }', 0);
      }
    }

  });

  // move
  $('[l-move]').each(function(k) {
    document.styleSheets[0].insertRule('[l-move]:nth-child('+ (k + 1) +') { position: relative; left: calc(100% * '+ $(this).attr('l-move') +'); }', 0);
  });

  // cycle
  $('[l-cycle]').each(function(k) {
    document.styleSheets[0].insertRule('[l-cycle]:nth-child('+ (k + 1) +') > *:nth-child('+ $(this).attr('l-cycle') +'n + 1) { clear: both; }', 0);
    document.styleSheets[0].insertRule('[l-cycle]:nth-child('+ (k + 1) +') > *:nth-child(n) { clear: none; }', 0);
  });

});
