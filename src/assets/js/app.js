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
    $(".body-overlay").addClass("show");
  });

  $(".sidebar-close-btn, .body-overlay").on("click", function(){
    $(".sidebar").removeClass("sidebar-open");
    $(".body-overlay").removeClass("show");
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
  

  // ======================= side menu js start =======================
  $('.side-menu-icon').on('click', function () {
    $('.side-menu').addClass('open');
    $('.body-overlay').addClass('show');
    $('body').addClass('pe-18 overflow-hidden');
  });

  $('.body-overlay, .close-side-menu').on('click', function () {
    $('.side-menu').removeClass('open');
    $('.body-overlay').removeClass('show');
    $('body').removeClass('pe-18 overflow-hidden');
  });
  // ======================= side menu js end =======================
  
  // ========================== Add Attribute For Bg Image Js Start ====================
  $(".bg-img").css('background', function () {
    var bg = ('url(' + $(this).data("background-image") + ')');
    return bg;
  });
  // ========================== Add Attribute For Bg Image Js End =====================
  

  // Light Dark version js 
  // $(document).ready(function () {
  //   const themeToggle = $("#theme-toggle .form-check-input");

  //   // Synchronize the switch state with the theme
  //   const storedTheme = localStorage.getItem("theme") || "light";
  //   themeToggle.prop("checked", storedTheme === "dark");

  //   // Toggle theme on switch click
  //   themeToggle.on("change", function () {
  //     const isDarkTheme = $(this).is(":checked");
  //     const newTheme = isDarkTheme ? "dark" : "light";
  //     $("html").attr("data-theme", newTheme);
  //     localStorage.setItem("theme", newTheme);
  //   });
  // });

})(jQuery);