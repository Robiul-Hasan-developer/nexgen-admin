(function ($) {
  'use strict';

  // sidebar submenu collapsible js
  $(".sidebar-menu .dropdown").on("click", function(){
    var item = $(this);
    item.siblings(".dropdown").children(".sidebar-submenu").slideUp();

    item.siblings(".dropdown").removeClass("dropdown-open");

    item.siblings(".dropdown").removeClass("open");

    item.children(".sidebar-submenu").slideToggle();

    item.toggleClass("dropdown-open");
  });

  $(".sidebar-toggle").on("click", function(){
    $(this).toggleClass("active");
    $(".sidebar").toggleClass("active");
    $(".dashboard-main").toggleClass("active");
  });

  $(".sidebar-mobile-toggle").on("click", function(){
    $(".sidebar").addClass("sidebar-open");
    $("body").addClass("overlay-active");
  });

  $(".sidebar-close-btn").on("click", function(){
    $(".sidebar").removeClass("sidebar-open");
    $("body").removeClass("overlay-active");
  });

  $(function () {
    var nk = window.location.href.split(/[?#]/)[0]; // Get the base URL without hash or query parameters
    var o = $("ul#sidebar-menu a")
      .filter(function () {
        return this.href.split(/[?#]/)[0] === nk; // Compare only the base URL
      })
      .addClass("active-page") // Add class to the anchor
      .parent()
      .addClass("active-page"); // Add class to the parent (li)
  
    while (o.is("li")) {
      o = o.parent().addClass("show").parent().addClass("open"); // Add classes to parent elements
    }
  });
  


  // Light Dark version js 
  $(document).ready(function () {
    const themeToggle = $("#theme-toggle .form-check-input");

    // Synchronize the switch state with the theme
    const storedTheme = localStorage.getItem("theme") || "light";
    themeToggle.prop("checked", storedTheme === "dark");

    // Toggle theme on switch click
    themeToggle.on("change", function () {
      const isDarkTheme = $(this).is(":checked");
      const newTheme = isDarkTheme ? "dark" : "light";
      $("html").attr("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  });


// =========================== Table Header Checkbox checked all js Start ================================
$('#selectAll').on('change', function () {
  $('.form-check .form-check-input').prop('checked', $(this).prop('checked')); 
}); 

  // Remove Table Tr when click on remove btn start
  $('.remove-btn').on('click', function () {
    $(this).closest('tr').remove(); 

    // Check if the table has no rows left
    if ($('.table tbody tr').length === 0) {
      $('.table').addClass('bg-danger');

      // Show notification
      $('.no-items-found').show();
    }
  });
  // Remove Table Tr when click on remove btn end
})(jQuery);