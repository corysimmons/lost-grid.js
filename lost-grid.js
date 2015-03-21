// lost-grid.js - v0.0.4

$(function() {

  var lost = {
    gutter: 30,
    maxWidth: 1000,
    rtl: false,
    breakpoints: [0, 600, 1000]
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


  // l-container
  $('[l-container]').each(function(k) {
    if($(this).attr('l-container') > 0) {
      $(this).css({
        maxWidth: lost.maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: $(this).attr('l-container'),
        paddingRight: $(this).attr('l-container')
      });
    } else {
      $(this).css({
        maxWidth: lost.maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto'
      });
    }
  });


  // l-row
  sheet.insertRule('[l-row] { *zoom: 1; margin-left: '+ (lost.gutter / 2 * -1) +'px; margin-right: '+ (lost.gutter / 2 * -1) +'px; }', 0);
  sheet.insertRule('[l-row]:before { content: ""; display: table; }', 0);
  sheet.insertRule('[l-row]:after { content: ""; display: table; clear: both; }', 0);


  // l-col
  if(!lost.rtl) {
    sheet.insertRule('[l-col] { float: left; }', 0);
  } else {
    sheet.insertRule('[l-col] { float: right; }', 0);
  }

  var setColumns = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-col]').each(function(k, v) {

        var fractions = $(this).attr('l-col').split(' ');

        if($(window).width() > breakpoint) {

          if(lost.gutter > 0) {
            $(this).css({
              width: 'calc(100% * '+ fractions[i] +' - '+ lost.gutter +'px)',
              marginLeft: (lost.gutter / 2),
              marginRight: (lost.gutter / 2)
            });
          } else {
            $(this).css({
              width: 'calc(100% * '+ fractions[i] +')'
            });
          }

        }

      });

    });
  };

  var didResize = false;
  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if(didResize) {
      setColumns();
      didResize = false;
    }
  }, 250);

  setColumns();


  // l-offset
  $('[l-offset]').each(function(k) {
    if(lost.gutter > 0) {
      if(parseInt($(this).attr('l-offset')) > 0) {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-col') +' - '+ lost.gutter +'px)',
          marginRight: lost.gutter / 2,
          marginLeft: 'calc(100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2))'
        });
      } else {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-col') +' - '+ lost.gutter +')',
          marginLeft: lost.gutter / 2,
          marginRight: 'calc(-100% * '+ $(this).attr('l-offset') +' + ('+ lost.gutter +'px / 2))'
        });
      }
    } else {
      if(parseInt($(this).attr('l-offset')) > 0) {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-col') +')',
          marginLeft: 'calc(100% * '+ $(this).attr('l-offset') +')'
        });
      } else {
        $(this).css({
          width: 'calc(100% * '+ $(this).attr('l-col') +')',
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
