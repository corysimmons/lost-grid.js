// lost-grid.js - v0.0.1

$(function() {

  var lost = {
    gutter: 30,
    breakpoint: 1000,
    rtl: false
  };


  // stylesheet
  var sheet = (function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  })();


  // l-center
  $('[l-center]').each(function(k) {
    if($(this).attr('l-center') > 0) {
      sheet.insertRule('[l-center]:nth-of-type('+ (k + 1) +') { max-width: '+ lost.breakpoint +'px; margin-left: auto; margin-right: auto; padding-left: '+ $(this).attr('l-center') +'px; padding-right: '+ $(this).attr('l-center') +'px; }', 0);
    } else {
      sheet.insertRule('[l-center]:nth-of-type('+ (k + 1) +') { max-width: '+ lost.breakpoint +'px; margin-left: auto; margin-right: auto; }', 0);
    }
  });


  // l-row
  sheet.insertRule('[l-row] { *zoom: 1; margin-left: '+ (lost.gutter / 2 * -1) +'px; margin-right: '+ (lost.gutter / 2 * -1) +'px; }', 0);
  sheet.insertRule('[l-row]:before { content: ""; display: table; }', 0);
  sheet.insertRule('[l-row]:after { content: ""; display: table; clear: both; }', 0);


  if(!lost.rtl) {
    sheet.insertRule('[l-column] { float: left; }', 0);
  } else {
    sheet.insertRule('[l-column] { float: right; }', 0);
  }

  $('[l-center]').each(function(x) {


    // l-offset
    $(this).find('[l-offset]').each(function(k) {
      if(lost.gutter > 0) {
        if(parseInt($(this).attr('l-offset')) > 0) {
          sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-offset]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-right: '+ (lost.gutter / 2) +'px; margin-left: calc(100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2)); }', 0);
        } else {
          sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-offset]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-left: '+ (lost.gutter / 2) +'px; margin-right: calc(-100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2)); }', 0);
        }
      } else {
        if(parseInt($(this).attr('l-offset')) > 0) {
          sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); margin-left: calc(100% * '+ $(this).attr('l-offset') +'); }', 0);
        } else {
          sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); margin-right: calc(-100% * '+ $(this).attr('l-offset') +'); }', 0);
        }
      }
    });


    // l-column
    $(this).find('[l-column]').each(function(k) {

      if(lost.gutter > 0) {
        sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px); margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
      } else {
        sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-column]:nth-child('+ (k + 1) +') { width: calc(100% * '+ $(this).attr('l-column') +'); }', 0);
      }

    });


    // move
    $(this).find('[l-move]').each(function(k) {
      sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-move]:nth-child('+ (k + 1) +') { position: relative; left: calc(100% * '+ $(this).attr('l-move') +'); }', 0);
    });


    // cycle
    $(this).find('[l-cycle]').each(function(k) {
      sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-cycle]:nth-child('+ (k + 1) +') > *:nth-child('+ $(this).attr('l-cycle') +'n + 1) { clear: both; }', 0);
      sheet.insertRule('[l-center]:nth-of-type('+ (x + 1) +') [l-cycle]:nth-child('+ (k + 1) +') > *:nth-child(n) { clear: none; }', 0);
    });


  });


});
