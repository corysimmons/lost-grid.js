// lost-grid.js - v0.0.2

$(function() {

  var lost = {
    gutter: 0,
    breakpoint: 1000,
    rtl: false
  };


  // avoid fouc
  setTimeout(function() {
    $('body').fadeIn(250);
  }, 250);


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
      $(this).css({
        maxWidth: lost.breakpoint,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: $(this).attr('l-center'),
        paddingRight: $(this).attr('l-center')
      });
    } else {
      $(this).css({
        maxWidth: lost.breakpoint,
        marginLeft: 'auto',
        marginRight: 'auto'
      });
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


  // l-column
  $('[l-column]').each(function(k) {

    if(lost.gutter > 0) {
      $(this).css({
        width: 'calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px)',
        marginLeft: (lost.gutter / 2),
        marginRight: (lost.gutter / 2)
      });
    } else {
      $(this).css({
        width: 'calc(100% * '+ $(this).attr('l-column') +')'
      });
    }

  });


  // l-offset
  $('[l-offset]').each(function(k) {
    if(lost.gutter > 0) {
      if(parseInt($(this).attr('l-offset')) > 0) {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +'px)',
          marginRight: lost.gutter / 2,
          marginLeft: 'calc(100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2))'
        });
      } else {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-column') +' - '+ lost.gutter +')',
          marginLeft: lost.gutter / 2,
          marginRight: 'calc(-100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2))'
        });
      }
    } else {
      if(parseInt($(this).attr('l-offset')) > 0) {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-column') +')',
          marginLeft: 'calc(100% * '+ $(this).attr('l-offset') +')'
        });
      } else {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-column') +')',
          marginRight: 'calc(-100% * '+ $(this).attr('l-offset') +')'
        });
      }
    }
  });


  // move
  $('[l-move]').each(function(k) {
    $(this).css({
      position: 'relative',
      left: 'calc(100% * '+ $(this).attr('l-move') +')'
    });
  });


  // cycle
  $('[l-cycle]').each(function(k) {
    $(this).find('> *:nth-child('+ $(this).attr('l-cycle') +'n + 1)').css({
      clear: 'both'
    });
    sheet.insertRule('[l-cycle] > *:nth-child(n) { clear: none; }', 0);
  });


});
