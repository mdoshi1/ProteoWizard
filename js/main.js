/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
/*function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);*/

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

// Toggles hidden divs on button click
$('.content-section button').click(function() {
    if (!($(this).hasClass('btn-selected'))) {
        $('.content-section button').removeClass('btn-selected');
        $(this).addClass('btn-selected');
        var oldHidden = $('.hidden');
        var oldShown = $('.shown');
        oldHidden.removeClass('hidden');
        oldHidden.addClass('shown');
        oldShown.removeClass('shown');
        oldShown.addClass('hidden');
    }
})

// Popup window for license agreements
function popup(link, windowName) { 
    if (!window.focus) 
        return true;
    var href;
    if (typeof(link) == 'string') 
        href = link;
    else 
        href = link.href; 
    window.open(href, windowName, 'width=600,height=400,scrollbars=yes'); 
    return false; 
  }

// Toggles currently shown license agreement
function switchLicense(className) {
    if ($('div.' + className).hasClass('hidden')) {
        var oldHidden = $('div.' + className);
        var oldShown = $('.shown');
        oldHidden.removeClass('hidden');
        oldHidden.addClass('shown');
        oldShown.removeClass('shown');
        oldShown.addClass('hidden');
    }
}