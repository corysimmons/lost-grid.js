// lost-grid.js - v0.0.5

$(function() {


  // Settings
  var lost = {
    gutter: 30,
    maxWidth: 1000,
    rtl: false,
    breakpoints: [0, 600, 1000]
  };


  // Create stylesheet
  var sheet = (function() {
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);
    return style.sheet;
  })();


  // l-container
  sheet.insertRule('[l-container] { margin-left: auto; margin-right: auto; }', 0);

  var setContainers = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-container]').each(function(k) {

        var paddings = $(this).attr('l-container').split(' ');

        if($(window).width() > breakpoint) {

          $(this).css({
            maxWidth: lost.maxWidth,
            paddingLeft: paddings[i] + 'px',
            paddingRight: paddings[i] + 'px'
          });

        }

      });

    });
  };


  // l-row
  sheet.insertRule('[l-row] { *zoom: 1; margin-left: '+ (lost.gutter / 2 * -1) +'px; margin-right: '+ (lost.gutter / 2 * -1) +'px; }', 0);
  sheet.insertRule('[l-row]:before { content: ""; display: table; }', 0);
  sheet.insertRule('[l-row]:after { content: ""; display: table; clear: both; }', 0);


  // l-col
  if(!lost.rtl) {
    sheet.insertRule('[l-col] { float: left; margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
  } else {
    sheet.insertRule('[l-col] { float: right; margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
  }

  var setColumns = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-col]').each(function(k) {

        var fractions = $(this).attr('l-col').split(' ');

        if($(window).width() > breakpoint) {

          if(lost.gutter > 0) {
            $(this).css({
              width: 'calc(100% * '+ fractions[i] +' - '+ lost.gutter +'px)'
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


  // l-offset
  var setOffsets = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-offset]').each(function(k) {

        var fractions = $(this).attr('l-offset').split(' ');

        if($(window).width() > breakpoint) {

          if(lost.gutter > 0) {
            if(parseInt(fractions[i]) > 0) {
              $(this).css({
                marginLeft: 'calc(100% * '+ fractions[i] +' + ('+ lost.gutter +'px / 2))'
              });
            } else {
              $(this).css({
                marginRight: 'calc(-100% * '+ fractions[i] +' + ('+ lost.gutter +'px / 2))'
              });
            }
          } else {
            if(parseInt(fractions[i]) > 0) {
              $(this).css({
                marginLeft: 'calc(100% * '+ fractions[i] +')'
              });
            } else {
              $(this).css({
                marginRight: 'calc(-100% * '+ fractions[i] +')'
              });
            }
          }

        }

      });

    });
  };


  // l-move
  sheet.insertRule('[l-move] { position: relative; }', 0);

  var setMoves = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-move]').each(function(k) {

        var fractions = $(this).attr('l-move').split(' ');

        if($(window).width() > breakpoint) {

          $(this).css({
            left: 'calc(100% * '+ fractions[i] +')'
          });

        }

      });

    });
  };


  // l-cycle
  var setCycles = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-cycle]').each(function(k) {

        var cycles = $(this).attr('l-cycle').split(' ');

        if($(window).width() > breakpoint) {

          $(this).find('> *:nth-child(n)').css('clear', 'none');
          $(this).find('> *:nth-child('+ cycles[i] +'n + 1)').css({
            clear: 'both'
          });

        }

      });

    });
  };


  // Throttled resizing
  var didResize = false;
  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if(didResize) {
      setContainers();
      setColumns();
      setOffsets();
      setMoves();
      setCycles();
      didResize = false;
    }
  }, 250);


  // Initial setters
  setContainers();
  setColumns();
  setOffsets();
  setMoves();
  setCycles();


  // Avoid FOUC
  setTimeout(function() {
    $('body').fadeIn(250);
  }, 250);


});
