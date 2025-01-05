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
  // sidebar submenu collapsible js


  // Active page js
  // $(function () {
  //   var nk = window.location.href.split(/[?#]/)[0]; // Get the base URL without hash or query parameters
  //   var o = $("ul#sidebar-menu a")
  //     .filter(function () {
  //       return this.href.split(/[?#]/)[0] === nk; // Compare only the base URL
  //     })
  //     .addClass("active-page") // Add class to the anchor
  //     .parent()
  //     .addClass("active-page"); // Add class to the parent (li)
  
  //   while (o.is("li")) {
  //     o = o.parent().addClass("show").parent().addClass("open"); // Add classes to parent elements
  //   }
  // });

  // ========================== add active class to navbar menu current page Js Start =====================
  function dynamicActiveMenuClass(selector) {
    let FileName = window.location.pathname.split("/").reverse()[0];

    // If we are at the root path ("/" or no file name), keep the active-page class on the Home item
    if (FileName === "" || FileName === "index.html") {
      // Keep the active-page class on the Home link
      selector.find("li.nav-menu__item.has-submenu").eq(0).addClass("active-page");
    } else {
      // Remove active-page class from all items first
      selector.find("li").removeClass("active-page");

      // Add active-page class to the correct li based on the current URL
      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") == FileName) {
          $(this).addClass("active-page");
        }
      });

      // If any li has active-page element, add class to its parent li
      selector.children("li").each(function () {
        if ($(this).find(".active-page").length) {
          $(this).addClass("active-page");
        }
      });
    }
  }

  if ($('ul').length) {
    dynamicActiveMenuClass($('ul'));
  }
// ========================== add active class to navbar menu current page Js End =====================


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

  // ========================== RTL LTR Js Start =====================
  var rtlLtrBtn = document.querySelector('.ltr-rtl-btn');

  // On page load, set the initial direction and button state based on localStorage
  var storedDir = localStorage.getItem('htmlDir');
  var storedClass = localStorage.getItem('btnClass');

  if (storedDir) {
    document.documentElement.setAttribute('dir', storedDir);
    rtlLtrBtn.innerHTML = storedDir === 'ltr' ? 'RTL' : 'LTR';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    rtlLtrBtn.innerHTML = 'RTL';
  }

  if (storedClass) {
    rtlLtrBtn.className = storedClass; // Set the button's class from localStorage
  } else {
    rtlLtrBtn.classList.add('bg-primary-600'); // Default button class
  }

  // Add event listener for button click
  rtlLtrBtn.addEventListener('click', function () {
    var htmlElement = document.documentElement;

    if (htmlElement.getAttribute('dir') === 'ltr') {
      htmlElement.setAttribute('dir', 'rtl');
      this.innerHTML = "LTR";
      localStorage.setItem('htmlDir', 'rtl'); // Save direction to localStorage
      this.classList.remove('bg-primary-600');
      this.classList.add('bg-success-600');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      this.innerHTML = "RTL";
      localStorage.setItem('htmlDir', 'ltr'); // Save direction to localStorage
      this.classList.add('bg-primary-600');
      this.classList.remove('bg-success-600');
    }

    // Save the updated class list to localStorage
    localStorage.setItem('btnClass', this.className);
  });
  // ========================== RTL LTR Js End =====================

  // ========================== Set Language in dropdown Js Start =================================
  $('.lang-dropdown li').each(function () {
    var thisItem = $(this); 

    thisItem.on('click', function () {
      const listText = thisItem.text().trim(); // Get the text of the clicked item
      const listImageSrc = thisItem.find('img').attr('src'); // Get the image source of the clicked item

      // Set the selected text and image
      const selectedTextContainer = thisItem.closest('.group-item').find('.selected-text');
      selectedTextContainer.contents().last().replaceWith(listText); // Update the text (after the image)
      selectedTextContainer.find('img').attr('src', listImageSrc); // Update the image
    });
  });
  // ========================== Set Language in dropdown Js End =================================
  
  
  // *********************************** Toast Notification Js start ***********************************
  var notification = document.querySelector('.toast-message');
  var notificationText = document.querySelector('.notification-text');
  var closeToast = document.querySelector('.close-toast');
  var toastTimeout; // Declare a global timeout variable

  function toastMessage(toastTextMessage) {
    notificationText.innerHTML = toastTextMessage;
    notification.classList.add('active');

    // Set timeout to remove the active class after 3.5 seconds
    toastTimeout = setTimeout(() => {
      notification.classList.remove('active');
    }, 3500);

    // Close the notification
    if (closeToast) {
      closeToast.addEventListener('click', function () {
        notification.classList.remove('active');
        notification.classList.add('d-none');
        setTimeout(() => {
          notification.classList.remove('d-none');
        }, 1);
      });
    }

    // Hover to pause the removal of the active class
    if (notification) {
      notification.addEventListener('mouseenter', function () {
        clearTimeout(toastTimeout);
        this.classList.add('active');
      });

      notification.addEventListener('mouseleave', function () {
        this.classList.remove('active'); 
      });
    }
  }
  // ********************************** Toast Notification Js end **********************************
  
  // *************************** Delete Tr js start ***************************
  $(".delete-tr-button").on('click', function () {
    $(this).closest('tr').addClass('d-none');
    toastMessage("You deleted successfully!");
  });
  // *************************** Delete Tr js End ***************************

  // ========================= Delete Item Js start ===================
  $('.delete-button').on('click', function () {
    $(this).closest('.delete-item').addClass('d-none');
    toastMessage("You deleted successfully!");
  });
  // ========================= Delete Item Js End ===================

  // ***************************** Show hide password js ***************************** 
  document.querySelectorAll('.toggle-icon').forEach(function (toggleIcon) {
    var passwordField = toggleIcon.closest('div').querySelector('.password-field');

    if(toggleIcon) {
      toggleIcon.addEventListener('click', function () {
        if(passwordField.type === 'password') { 
          passwordField.type = 'text';
          this.classList.remove('ri-eye-off-line');
          this.classList.add('ri-eye-line');
        } else {
          passwordField.type = 'password';
          this.classList.remove('ri-eye-line');
          this.classList.add('ri-eye-off-line');
        }
      });
    }
  });
  // ***************************** Show hide password js ***************************** 

  // *************************** Max Text in textarea js start ***************************
  var maxDescArea = document.querySelector('.max-desc');
  var textLength = document.querySelector('.text-length');
  var maxText = 1000;
  
  if(maxDescArea) {
    maxDescArea.addEventListener('input', function (event) {
        var valueLength = maxDescArea.value.length;
        textLength.innerHTML = `${valueLength} / ${maxText}`;
        
        if(valueLength > maxText ) {
          this.value = this.value.slice(0, maxText);
          textLength.innerHTML = `${maxText} / ${maxText}`;
        }
    });
  }
  // *************************** Max Text in textarea js End ***************************
  
   // ***************************** Validation js ***************************** 
   var inputs = document.querySelectorAll('.validation-input');
   if(inputs) {
    inputs.forEach((input) => {
        input.addEventListener('input', function () {
            // Check if input type is email
            if (input.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(input.value.trim())) {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                    input.closest('.validation').querySelector('.invalid-feedback').classList.remove('d-block');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                    input.closest('.validation').querySelector('.invalid-feedback').classList.add('d-block');
                }
            } else {
                if (input.value.trim() !== "") {
                    input.classList.add('is-valid');
                    input.classList.remove('is-invalid');
                    input.closest('.validation').querySelector('.invalid-feedback').classList.remove('d-block');
                } else {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                    input.closest('.validation').querySelector('.invalid-feedback').classList.add('d-block');
                }
            }
        });
    });
   }
 // ***************************** Validation js end ***************************** 
  
  // ========================= Form Submit Js start ===================
  var submitForm = document.querySelector('.submit-form');
  var inputField = document.querySelectorAll('.form-control');

  if(submitForm) {
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      
      inputField.forEach((inputItem) => {
        inputItem.classList.remove('is-valid');
        inputItem.value = "";
      });
      
      toastMessage("Form submitted successfully!");
    });
  }
  // ========================= Form Submit Js End ===================
  
  // ========================= Field Sidebar Js Start ===================
  var fieldSidebar = document.querySelector('.field-sidebar');
  var fieldSidebarBtn = document.querySelector('.field-sidebar-btn');

  if(fieldSidebar && fieldSidebarBtn) {
    fieldSidebarBtn.addEventListener('click', function () {
      if (this.classList.contains('btn-primary-600')) {
        this.classList.remove('btn-primary-600');
        this.classList.add('btn-danger-600');
        this.innerHTML = "Hide Fields";
      } else {
        this.classList.add('btn-primary-600');
        this.classList.remove('btn-danger-600');
        this.innerHTML = "Additional Fields";
      }
  
      fieldSidebar.classList.toggle('d-none');
    });
  }
  // ========================= Field Sidebar Js End ===================

  
  // ========================= review act btn Js Start ===================
  var reviewActBtn = document.querySelector('.review-act-btn');

  if(reviewActBtn) {
    reviewActBtn.addEventListener('click', function(e) { 
      var reviewActBtnText = this.querySelector('.text');
      var reviewActBtnIcon = this.querySelector('.icon');
  
      if (reviewActBtnText.innerHTML.trim() === "Start Action") {
        reviewActBtnText.innerHTML = "Continue";
        reviewActBtnIcon.classList.remove('ri-play-circle-line');
        reviewActBtnIcon.classList.add('ri-pause-circle-line');
      } 
      else if (reviewActBtnText.innerHTML.trim() === "Continue") {
        reviewActBtnText.innerHTML = "Auto Finish";
        reviewActBtnIcon.classList.remove('ri-pause-circle-line');
        reviewActBtnIcon.classList.add('ri-stop-circle-line');
  
        this.classList.remove('btn-success-600');
        this.classList.add('btn-danger-600');
      } 
      else {
        reviewActBtnText.innerHTML = "Completed";
        reviewActBtnIcon.classList.remove('ri-stop-circle-line');
        reviewActBtnIcon.classList.add('ri-checkbox-circle-line');
  
        this.classList.remove('btn-danger-600');
        this.classList.add('btn-primary-600');
      }
    });
  }
  // ========================= review act btn Js End ===================

  // ========================= Table Tr Drag Js Start ===================
  const rows = document.querySelectorAll(".draggable-table tbody tr");

  rows.forEach((row) => {
    row.setAttribute("draggable", "true");
    
    row.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", row.rowIndex);
      e.currentTarget.classList.add("dragging", "cursor-move");
    });

    row.addEventListener("dragend", (e) => {
      e.currentTarget.classList.remove("dragging", "cursor-move");
    });

    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingRow = document.querySelector(".dragging");
      const currentRow = e.currentTarget;

      const rect = currentRow.getBoundingClientRect();
      const offset = e.clientY - rect.top;

      if (offset > rect.height / 2) {
        currentRow.parentNode.insertBefore(draggingRow, currentRow.nextSibling);
      } else {
        currentRow.parentNode.insertBefore(draggingRow, currentRow);
      }
    });

    row.addEventListener("drop", (e) => {
      e.preventDefault();
    });
  });
  // ========================= Table Tr Drag Js End ===================


  // ========================== Light Dark version js start ==========================
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
  // ========================== Light Dark version js end ==========================


  // ====================== Preloader js start =================
  $(window).on('load', function () {
    $('.loader-mask').fadeOut();
  });
  // ====================== Preloader js End =================


})(jQuery);
