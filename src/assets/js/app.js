import { toastMessage } from './toast.js';

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
  
  // *************************** Delete Tr js start ***************************
  $(".delete-tr-button").on('click', function () {
    $(this).closest('tr').addClass('d-none');
    toastMessage("danger", "Deleted", "You deleted successfully!", 'ri-delete-bin-line');
  });
  // *************************** Delete Tr js End ***************************

  // ========================= Delete Item Js start ===================
  $('.delete-button').on('click', function () {
    $(this).closest('.delete-item').addClass('d-none');
    toastMessage("danger", "Deleted", "You deleted successfully!", 'ri-delete-bin-line');
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
   var inputs = document.querySelectorAll('input[type="email"]');
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
      toastMessage("success", "Success", "Form submitted successfully!", 'ri-checkbox-circle-fill');
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
        this.innerHTML = "Additional Fields";
      } else {
        this.classList.add('btn-primary-600');
        this.classList.remove('btn-danger-600');
        this.innerHTML = "Hide Fields";
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
        reviewActBtnText.innerHTML = "Pause";
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

  if(rows) {
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
  }
  // ========================= Table Tr Drag Js End ===================


  // ========================= Announcement Dept Select Js start ===================
  let searchFilterInput = document.querySelector('.search-filter-input');

  let announcementDeptSelect = document.querySelector('.announcement-dept-select');
  let announcementItems = document.querySelectorAll('.announcement-item');
  
  if(announcementDeptSelect && announcementItems) {
    announcementDeptSelect.addEventListener('change', function (event) {
      const selectedValue = event.target.value;
  
      // Filter Announcement Item
      announcementItems.forEach(item => {
        const itemValue = item.getAttribute("data-value");
        
        if(selectedValue === itemValue) { 
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
      // Filter Announcement Item end
      
      // Select's selected value replace to the search input filter start
      if(selectedValue === "Select Announcement") {
        searchFilterInput.setAttribute('placeholder', 'Search here...');
      } else {
        searchFilterInput.setAttribute('placeholder', `Search by ${selectedValue}`);
      }
      // Select's selected value replace to the search input filter end
    });
  }
  // ========================= Announcement Dept Select Js End ===================

  
  // ========================= checkbox checked announcement item Js start ===================
  let announcementItemCheckboxes = document.querySelectorAll('.announcement-item-checkbox');

  announcementItemCheckboxes.forEach(checkboxItem => {
    checkboxItem.addEventListener('change', function () {

      const parentItem = this.closest('.check-announcement-item');

      if(this.checked) {
        parentItem.classList.add('bg-neutral-100');
      } else {
        parentItem.classList.remove('bg-neutral-100');
      }

    });
  });
  // ========================= checkbox checked announcement item Js End ===================

  
  // ========================= Days Select Input Js Start ===================
  let daysSelectInput = document.querySelectorAll('.days-select-input');

  daysSelectInput.forEach(checkedItem => {
    checkedItem.addEventListener('change', function (event) {
      if(checkedItem.checked) {
        checkedItem.closest('div').querySelector('.form-check-label').classList.remove('bg-neutral-200', 'text-secondary-light-two');
        checkedItem.closest('div').querySelector('.form-check-label').classList.add('bg-primary-600', 'text-white');
      } else {
        checkedItem.closest('div').querySelector('.form-check-label').classList.add('bg-neutral-200', 'text-secondary-light-two');
        checkedItem.closest('div').querySelector('.form-check-label').classList.remove('bg-primary-600', 'text-white');
      }
    });
  });
  // ========================= Days Select Input Js End ===================

  
  // ========================= Add Action Add Remove Js Start ===================
    document.addEventListener('DOMContentLoaded', function () {
      var addActionWrappers = document.querySelectorAll('.add-action-wrapper');

      if(addActionWrappers) {
        addActionWrappers.forEach(function (wrapper) {
            var addActionAdd = wrapper.querySelector('.add-action__add');
            var addActionRemove = wrapper.querySelector('.add-action__remove');
  
            // Function to handle adding a new wrapper
            addActionAdd.addEventListener('click', function () {
                toastMessage("success", "Success", "Add action create successfully!", 'ri-checkbox-circle-fill');
                // Clone the wrapper
                var newWrapper = wrapper.cloneNode(true);
  
                // Reset the cloned wrapper's values
                var selects = newWrapper.querySelectorAll('select');
                selects.forEach(function (select) {
                    select.selectedIndex = 0; // Reset dropdowns to their default option
                });
  
                // Attach remove button functionality to the new clone
                var removeButton = newWrapper.querySelector('.add-action__remove');
                removeButton.addEventListener('click', function () {
                    this.closest('.add-action-wrapper').remove();
                    toastMessage("danger", "Deleted", "You deleted successfully!", 'ri-delete-bin-line');
                });
  
                // Insert the cloned wrapper immediately after the current one
                wrapper.insertAdjacentElement('afterend', newWrapper);
            });
  
            // Function to handle removing the wrapper
            addActionRemove.addEventListener('click', function () {
                wrapper.remove();
            });
        });
      }
  });
  // ========================= Add Action Add Remove Js End ===================

  
  // ========================= Custom Accordion of Add Event Js Start ===================
  let collapseBtns = document.querySelectorAll('.collapse-btn');

  collapseBtns.forEach((collapseBtn) => {
    collapseBtn.addEventListener('click', function () {

      let collapsableBody = collapseBtn.closest('.delete-item').querySelector('.collapsable-body');
      this.closest('.delete-item').classList.toggle('active');
      
      collapsableBody.classList.toggle('d-none');
    });
  });
  // ========================= Custom Accordion of Add Event Js End ===================

  
  // ========================= Email Sidebar see more btn and list Js Start ===================
  let seeMoreBtn = document.querySelector('.see-more-btn');
  let seeMoreList = document.querySelector('.see-more-list');

  if(seeMoreBtn && seeMoreList) {
    seeMoreBtn.addEventListener('click', function () {
      seeMoreList.classList.toggle('d-none');
      this.classList.toggle('active');

      let btnText = seeMoreBtn.querySelector('.text');
      if(btnText.innerHTML === "More") {
        btnText.innerHTML = "Less";
      } else {
        btnText.innerHTML = "More";
      }
    });
  }
  // ========================= Email Sidebar see more btn and list Js End ===================

  // ========================= Check All checkbox by checking one checkbox start Start ===================
  let selectAll = document.querySelector('#selectAll');

  if (selectAll) {
    selectAll.addEventListener('change', function () {
      const allEmailItems = document.querySelectorAll('.email-item');

      allEmailItems.forEach((allEmailItem, index) => {
        const checkbox = allEmailItem.querySelector('.email-item__checkbox');
        checkbox.checked = this.checked;
        
        // Trigger change event manually
        $(checkbox).trigger('change');

        if (this.checked) {
          allEmailItem.classList.add('active');
          localStorage.setItem(`email-item-${index}`, 'active'); // Store active state
        } else {
          allEmailItem.classList.remove('active');
          localStorage.removeItem(`email-item-${index}`); // Remove active state
        }
      });
    });

    document.querySelectorAll('.email-item__checkbox').forEach((checkbox, index) => {
      checkbox.addEventListener('change', function () {
        const allEmailCheckboxes = document.querySelectorAll('.email-item__checkbox');
        const allChecked = Array.from(allEmailCheckboxes).every(cb => cb.checked);
        const anyChecked = Array.from(allEmailCheckboxes).some(cb => cb.checked);

        // Update the "Select All" checkbox
        selectAll.checked = allChecked;

        // Update the "active" class for the email item
        const emailItem = this.closest('.email-item');
        if (this.checked) {
          emailItem.classList.add('active');
          localStorage.setItem(`email-item-${index}`, 'active'); // Store active state
        } else {
          emailItem.classList.remove('active');
          localStorage.removeItem(`email-item-${index}`); // Remove active state
        }

        // Trigger the jQuery checkbox count update
        updateSelectedCount();
      });
    });

    // Initialize state from localStorage on page load
    document.addEventListener('DOMContentLoaded', () => {
      const allEmailItems = document.querySelectorAll('.email-item');

      allEmailItems.forEach((allEmailItem, index) => {
        const checkbox = allEmailItem.querySelector('.email-item__checkbox');
        const isActive = localStorage.getItem(`email-item-${index}`) === 'active';

        checkbox.checked = isActive; // Set checkbox state
        if (isActive) {
          allEmailItem.classList.add('active'); // Add active class
        } else {
          allEmailItem.classList.remove('active'); // Ensure active class is removed
        }
      });

      // Ensure "Select All" reflects the current state
      const allEmailCheckboxes = document.querySelectorAll('.email-item__checkbox');
      selectAll.checked = Array.from(allEmailCheckboxes).every(cb => cb.checked);

      // Update the selected count on page load
      updateSelectedCount();
    });
  }
  // ========================= Check All checkbox by checking one checkbox Js End ===================

  // ========================= Email Item checked Js Start ===================
  let emailItemCheckboxes = document.querySelectorAll('.email-item__checkbox');

  if (emailItemCheckboxes) {
    // Initialize checkboxes state from localStorage
    emailItemCheckboxes.forEach((checkboxItem, index) => {
      const isChecked = localStorage.getItem(`checkbox-${index}`) === 'true';
      checkboxItem.checked = isChecked;

      if (isChecked) {
        checkboxItem.closest('.email-item').classList.add('active');
      } else {
        checkboxItem.closest('.email-item').classList.remove('active');
      }
    });

    // Add event listeners to handle changes
    emailItemCheckboxes.forEach((checkboxItem, index) => {
      checkboxItem.addEventListener('change', function () {
        const isChecked = checkboxItem.checked;
        localStorage.setItem(`checkbox-${index}`, isChecked);

        if (isChecked) {
          this.closest('.email-item').classList.add('active');
        } else {
          this.closest('.email-item').classList.remove('active');
        }
      });
    });
  }
  // ========================= Email Item checked Js End ===================

  // ========================= Starred Star Js Start ===================
  let starredButtons = document.querySelectorAll('.starred-button');

  if(starredButtons) {
    starredButtons.forEach((starredButtonItem) => {
      starredButtonItem.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    });
  }
  // ========================= Starred Star Js End ===================

  
  // ========================= Delete All Selected Email Item Js Start ===================
  let actionMenuDelete = document.querySelector('.action-menu-delete');

  if(actionMenuDelete) {
    actionMenuDelete.addEventListener('click', function() {
      const activeEmailItems = document.querySelectorAll('.email-item.active');
      
      activeEmailItems.forEach((activeEmailItem) => {
        activeEmailItem.classList.add('d-none');
      });

      console.log(activeEmailItems.length);
      if(activeEmailItems.length > 0) {
        toastMessage("success", "Success", "All selected email item deleted successfully!", 'ri-delete-bin-line');
      }
    });
  }
  // ========================= Delete All Selected Email Item Js End ===================


  // ========================= Compose New Email Js Start ===================
  let composeEmailBtn = document.querySelector('.compose-email-btn');
  let composeEmailBox = document.querySelector('.compose-email-box');
  let minimizeComposeEmailBox = document.querySelector('.minimize-compose-email-box');
  let expandComposeEmailBox = document.querySelector('.expand-compose-email-box');
  let removeComposeEmailBoxes = document.querySelectorAll('.remove-compose-email-box');
  
  let formComposeEmailBox = document.querySelector('.form-compose-email');
  let bodyOverlay = document.querySelector('.body-overlay');

  if(composeEmailBtn && composeEmailBox && minimizeComposeEmailBox && expandComposeEmailBox && removeComposeEmailBoxes && formComposeEmailBox && bodyOverlay) {
    // Show and hide email box
    composeEmailBtn.addEventListener('click', function () {
      composeEmailBox.classList.add('d-block');
      composeEmailBox.classList.remove('d-none');
      chatBox.classList.add('d-none');
    });
  
    // Remove email box
    removeComposeEmailBoxes.forEach(removeComposeEmailBoxItem => {
      removeComposeEmailBoxItem.addEventListener('click', function () {
        composeEmailBox.classList.add('d-none');
        composeEmailBox.classList.remove('d-block');
        composeEmailBox.classList.remove('minimized');
        composeEmailBox.classList.remove('expanded');
        document.querySelector('.body-overlay').classList.remove('show');
      });
    })
    
    // Minimize email box
    minimizeComposeEmailBox.addEventListener('click', function () {
      composeEmailBox.classList.toggle('minimized');
      composeEmailBox.classList.remove('expanded');
      document.querySelector('.body-overlay').classList.remove('show');
    });
    
    // Minimize email box
    expandComposeEmailBox.addEventListener('click', function () {
      composeEmailBox.classList.remove('minimized');
      composeEmailBox.classList.toggle('expanded');
      document.querySelector('.body-overlay').classList.toggle('show');
    });
  
    // remove overlay and email box
    bodyOverlay.addEventListener('click', function () {
      composeEmailBox.classList.remove('d-block');
      composeEmailBox.classList.add('d-none');
      composeEmailBox.classList.remove('minimized');
      composeEmailBox.classList.remove('expanded');
      document.querySelector('.body-overlay').classList.remove('show');
    });
  
    formComposeEmailBox.addEventListener('submit', function () { 
      toastMessage("success", "Success", "Email Sent successfully!", 'ri-checkbox-circle-fill');
    });
  }
  
  // ========================= Compose New Email Js End ===================

  
  // ========================= Email Chat box Js End ===================
  let emailChatItems = document.querySelectorAll('.email-chat-item');
  let chatBox = document.querySelector('.chat-box');
  let removeChatBox = document.querySelector('.remove-chat-box');

  if(emailChatItems && chatBox && removeChatBox) {
    emailChatItems.forEach(chatItem => {
      chatItem.addEventListener('click', function() {
        chatBox.classList.remove('d-none');
        composeEmailBox.classList.add('d-none');
      });
    });
  
    removeChatBox.addEventListener('click', function() {
      chatBox.classList.add('d-none');
    });
  }
  // ========================= Email Chat box Js End ===================


  // ========================= Email Details reply Js Start ===================
  let emailReplyBtn = document.querySelector('.email-reply-btn');
  let removeEmailChatBox = document.querySelector('.remove-email-chat-box');
  let emailReplyBox = document.querySelector('.email-reply-box');
  let emailAutoReply = document.querySelector('.email-auto-reply');

  if(emailReplyBtn && removeEmailChatBox && emailReplyBox && emailAutoReply) {
    emailReplyBtn.addEventListener('click', function () {
      emailReplyBox.classList.remove('d-none');
      emailAutoReply.classList.add('d-none');
    });
  
    removeEmailChatBox.addEventListener('click', function () {
      emailReplyBox.classList.add('d-none');
      emailAutoReply.classList.remove('d-none');
    });
  }
  // ========================= Email Details reply Js End ===================


  // ========================= Link compose box Js Start ===================
  let linkComposeBox = document.querySelector('.link-compose-box');
  let linkComposeBtn = document.querySelector('.link-compose-btn');

  if(linkComposeBox && linkComposeBtn) {
    linkComposeBtn.addEventListener('click', function (event) {
      linkComposeBox.classList.toggle('d-none');
      event.stopPropagation();
    });
  
    document.addEventListener('click', function (event) {
      if (!linkComposeBox.contains(event.target) && !linkComposeBtn.contains(event.target)) {
        linkComposeBox.classList.add('d-none');
      }
    });
  }
  // ========================= Link compose box Js End ===================

  
  // ========================= delete event checkbox Js start ===================
  function handleCheckboxChange (checkboxId) {
    let collapseItems = document.querySelectorAll('.collapse-item');
    let deleteEventCheckbox = document.querySelector(checkboxId);
  
    if(deleteEventCheckbox && collapseItems) {
      deleteEventCheckbox.addEventListener('change', () => {
        collapseItems.forEach(collapseItem => {
          if (collapseItem.classList.contains('active')) {
            if (deleteEventCheckbox.checked) {
              collapseItem.classList.add('colored-text');
            } else {
              collapseItem.classList.remove('colored-text');
            }
          }
        });
      });
    }
  }
  handleCheckboxChange('#DeletedEventsTwo');
  handleCheckboxChange('#DeletedEventsThree');
  // ========================= delete event checkbox Js End ===================

  
  // ========================= Increment and Decrement Js Start ===================
  $(document).ready(function() {
    const minus = $('.quantity__minus');
    const plus = $('.quantity__plus');
    const input = $('.quantity__input');
    minus.click(function(e) {
      e.preventDefault();
      var value = input.val();
      if (value > 1) {
        value--;
      }
      input.val(value);
    });
    
    plus.click(function(e) {
      e.preventDefault();
      var value = input.val();
      value++;
      input.val(value);
    })
  });
  // ========================= Increment and Decrement Js End ===================
  
  // ========================= Password filed validation Js Start ===================
  document.addEventListener("DOMContentLoaded", function () {
    const passwordFields = document.querySelectorAll('.password-field'); // Select all password inputs
    const validationForm = document.querySelector('.validation-form');  // Select form
    const errorDivs = document.querySelectorAll(".password-error");     // Select error messages
    var inputField = document.querySelectorAll('.form-control');

    function validatePassword(password) {
        const minLength = /.{8,}/;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*]/;

        let errors = [];
        if (!minLength.test(password)) errors.push("At least 8 characters.");
        if (!upperCase.test(password)) errors.push("At least 1 uppercase letter.");
        if (!lowerCase.test(password)) errors.push("At least 1 lowercase letter.");
        if (!number.test(password)) errors.push("At least 1 number.");
        if (!specialChar.test(password)) errors.push("At least 1 special character (!@#$%^&*).");

        return errors;
    }

    if(validationForm) {
      validationForm.addEventListener("submit", function (e) {
          e.preventDefault();
          let hasError = false;
  
          if (passwordFields.length === 1) {
              // Login Page (Only One Password Field)
              const password = passwordFields[0].value;
              const errors = validatePassword(password);
  
              if (errors.length > 0) {
                  errorDivs[0].innerHTML = errors.join("<br>");
                  errorDivs[0].style.display = "block";
                  hasError = true;
              } else {
                  errorDivs[0].style.display = "none";
              }
  
          } else if (passwordFields.length === 2) {
              // Registration Page (Password + Confirm Password)
              const password = passwordFields[0].value;
              const confirmPassword = passwordFields[1].value;
              const errors = validatePassword(password);
  
              if (errors.length > 0) {
                  errorDivs[0].innerHTML = errors.join("<br>");
                  errorDivs[0].style.display = "block";
                  hasError = true;
              } else {
                  errorDivs[0].style.display = "none";
              }
  
              // Confirm Password Validation
              if (password !== confirmPassword) {
                  errorDivs[1].innerHTML = "Passwords do not match.";
                  errorDivs[1].style.display = "block";
                  hasError = true;
              } else {
                  errorDivs[1].style.display = "none";
              }
          }
  
          if (!hasError) {
            inputField.forEach((inputItem) => {
              inputItem.classList.remove('is-valid');
              inputItem.value = "";
            });
            toastMessage("success", "Success", "Form submitted successfully!", 'ri-checkbox-circle-fill');
            validationForm.submit(); // Uncomment this line for real form submission
          }
      });
    }
});
  // ========================= Password filed validation Js End ===================

  
  // ========================= Check if Form input field is not empty Js Start ===================
  let checkValidityForms = document.querySelectorAll('.checkValidityForm');
    
  if(checkValidityForms) {
      checkValidityForms.forEach(checkValidityForm => {
          let checkValiditySubmitBtn = checkValidityForm.querySelector('.checkValiditySubmitBtn');
          
          function checkFormValidity() {
              if (checkValidityForm.checkValidity()) {
                  checkValiditySubmitBtn.disabled = false;
              } else {
                  checkValiditySubmitBtn.disabled = true;
              }
              // checkValiditySubmitBtn.disabled = !checkValidityForm.checkValidity();
          }
          checkValidityForm.addEventListener("input", checkFormValidity);
          checkValidityForm.addEventListener("change", checkFormValidity);
      
          checkFormValidity();
      });
  }
  // ========================= Check if Form input field is not empty Js End ===================


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
