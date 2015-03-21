// lost-grid.js v0.0.6 - https://github.com/corysimmons/lost-grid.js

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


  /**
   *
   * [l-container]
   *
   * Create a container that is centered in the middle of the page with some padding on the left and right sides of it.
   *
   * @param {numbers} - Padding on the left and right side of the element. Sync with breakpoints to apply different paddings at different viewport widths.
   *
   * @example
   *   <section l-container="0 15 30">
   *     ...
   *   </section>
   *
   */

  sheet.insertRule('[l-container] { margin-left: auto; margin-right: auto; }', 0);

  var setContainers = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-container]').each(function() {

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


  /**
   *
   * [l-row]
   *
   * Apply a negative margin on each side of the element. This is required when adding columns and such to negate their outer margins. This mixin automatically applies clearfix as it's assumed floated elements will be nested within it.
   *
   * @example
   *   <section l-container>
   *     <div l-row>
   *       ...
   *     </div>
   *   </section>
   *
   */

  sheet.insertRule('[l-row] { *zoom: 1; margin-left: '+ (lost.gutter / 2 * -1) +'px; margin-right: '+ (lost.gutter / 2 * -1) +'px; }', 0);
  sheet.insertRule('[l-row]:before { content: ""; display: table; }', 0);
  sheet.insertRule('[l-row]:after { content: ""; display: table; clear: both; }', 0);


  /**
   *
   * [l-col]
   *
   * Creates a column that is a fraction of the size of its containing element with a margin on each side of the element. Pass multiple fractions to have the width of the element change for different screen sizes.
   *
   * @param {fractions} - A simple fraction of the containing element's width. You can pass floated numbers and even floats that are parts of fractions (e.g. 1.5/5). You can also pass multiple fractions for various breakpoints defined in this file.
   *
   * @example
   *   <section l-container>
   *     <div l-row>
   *       <figure l-col="1/2">1</figure>
   *       <figure l-col="1/2">2</figure>
   *     </div>
   *   </section>
   *
   */

  if(!lost.rtl) {
    sheet.insertRule('[l-col] { float: left; margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
  } else {
    sheet.insertRule('[l-col] { float: right; margin-left: '+ (lost.gutter / 2) +'px; margin-right: '+ (lost.gutter / 2) +'px; }', 0);
  }

  var setColumns = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-col]').each(function() {

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


  /**
   *
   * [l-offset]
   *
   * Margin to the left or right of an elements depending on if the fraction passed is positive or negative.
   *
   * @param {fractions} - A negative fraction will apply a margin-right the size of the fraction of the container to the element. A positive fraction will apply a margin-left. This accepts multiple values to work with breakpoints.
   *
   * @example
   *   <section l-container>
   *     <div l-row>
   *       <figure l-col="1/3" l-offset="1/3">1</figure>
   *       <figure l-col="1/3">2</figure>
   *     </div>
   *   </section>
   *
   */

  var setOffsets = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-offset]').each(function() {

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


  /**
   *
   * [l-move]
   *
   * Source ordering. Useful for having an element appear above or below another element on mobile devices, and then to the opposite side on larger devices. For instance, a sidebar and article. You might want the sidebar to appear before the article on mobile, but be to the right of the article on desktop. This is how that is achieved.
   *
   * @param {fractions} - Fraction of the container to be moved by its left value. This can accept multiple values for different breakpoints.
   *
   * @example
   *   <section l-container>
   *     <div l-row>
   *       <figure l-col="1/2" l-move="1/2">1</figure>
   *       <figure l-col="1/2" l-move="-1/2">2</figure>
   *     </div>
   *   </section>
   *
   */

  sheet.insertRule('[l-move] { position: relative; }', 0);

  var setMoves = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-move]').each(function() {

        var fractions = $(this).attr('l-move').split(' ');

        if($(window).width() > breakpoint) {

          $(this).css({
            left: 'calc(100% * '+ fractions[i] +')'
          });

        }

      });

    });
  };


  /**
   *
   * [l-cycle]
   *
   * Since columns are floated, when they are of unequal height, they will misalign easily. By setting [l-cycle] you can make sure elements are being cleared on appropriate rows.
   *
   * @param {numbers} - The nth-child + 1 element to clear on. If you want a row to be 3 elements wide, then you'd pass 3. This accepts multiple values for corresponding breakpoints. Apply this to the [l-row].
   *
   * @example
   *   <section l-container>
   *     <div l-row l-cycle="3">
   *       <figure l-col="1/3">1</figure>
   *       <figure l-col="1/3">2</figure>
   *       <figure l-col="1/3">3</figure>
   *       <figure l-col="1/3">4</figure>
   *       <figure l-col="1/3">5</figure>
   *       <figure l-col="1/3">6</figure>
   *     </div>
   *   </section>
   *
   */

  var setCycles = function() {
    $(lost.breakpoints).each(function(i, breakpoint) {

      $('[l-cycle]').each(function() {

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
