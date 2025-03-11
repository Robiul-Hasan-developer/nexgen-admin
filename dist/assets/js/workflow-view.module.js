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

// ========================= Delete Item Js start ===================
$('.delete-button').on('click', function () {
  $(this).closest('.delete-item').addClass('d-none');
});
// ========================= Delete Item Js End ===================

  // ================================ Aminated Radial Progress Bar Start ================================ 
  $('svg.radial-progress').each(function( index, value ) { 
        $(this).find($('circle.complete')).removeAttr( 'style' );
    });

    // Activate progress animation on scroll
    $(window).scroll(function(){
        $('svg.radial-progress').each(function( index, value ) { 
            // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
            if ( 
                $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
                $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
            ) {
                // Get percentage of progress
                percent = $(value).data('percentage');
                // Get radius of the svg's circle.complete
                radius = $(this).find($('circle.complete')).attr('r');
                // Get circumference (2πr)
                circumference = 2 * Math.PI * radius;
                // Get stroke-dashoffset value based on the percentage of the circumference
                strokeDashOffset = circumference - ((percent * circumference) / 100);
                // Transition progress for 1.25 seconds
                $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
            }
        });
    }).trigger('scroll');
  // ================================ Aminated Radial Progress Bar End ================================ 