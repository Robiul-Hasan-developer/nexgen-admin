 // ========================= Animated Radial Progress Js Start ===================
 function animateProgress() {
    $('svg.radial-progress').each(function () {
      // Check if the element is within the viewport
      const elementTop = $(this).offset().top;
      const elementBottom = elementTop + $(this).outerHeight();
      const viewportTop = $(window).scrollTop();
      const viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        const percent = $(this).data('percentage');
        const radius = $(this).find('circle.complete').attr('r');
        const circumference = 2 * Math.PI * radius;
        const strokeDashOffset = circumference - (percent / 100) * circumference;

        // Animate the circle
        $(this).find('circle.complete').css('stroke-dashoffset', strokeDashOffset);
      }
    });
  }

  // Trigger animation on scroll and page load
  $(window).on('scroll', animateProgress);
  animateProgress(); // Run on page load
// ========================= Animated Radial Progress Js End ===================