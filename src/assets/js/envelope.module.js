// ***************************** Data Table js ***************************** 
new DataTable('#example', {
    searching: false,   // Removes the search box
    lengthChange: false, 
  });

  // *****************************  Flat pickr or date picker js ***************************** 
  function getDatePicker(receiveID) {
    flatpickr(receiveID, {
      enableTime: false, // Ensure time is disabled to match the format
      dateFormat: "d M, Y", // Format to match placeholder
      mode: "range", // Enable range selection
      minDate: "today", // Prevent past dates
    });
  }
  getDatePicker('#dateTime');

  // *************************** Upload Single Image js start here ***************************
  const fileInput = document.getElementById("upload-file");
  const imagePreview = document.getElementById("uploaded-img__preview");
  const uploadedImgContainer = document.querySelector(".uploaded-img");
  const removeButton = document.querySelector(".uploaded-img__remove");

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      imagePreview.src = src;
      uploadedImgContainer.classList.remove('d-none');
    }
  });
  removeButton.addEventListener("click", () => {
    imagePreview.src = "";
    uploadedImgContainer.classList.add('d-none');
    fileInput.value = ""; 
  });

  // // Upload Two
  const fileInputTwo = document.getElementById("upload-file-two");
  const imagePreviewTwo = document.getElementById("uploaded-img__preview-two");
  const uploadedImgContainerTwo = document.querySelector(".uploaded-img-two");
  const removeButtonTwo = document.querySelector(".uploaded-img__remove-two");

  fileInputTwo.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const src = URL.createObjectURL(e.target.files[0]);
      imagePreviewTwo.src = src;
      uploadedImgContainerTwo.classList.remove('d-none');
    }
  });
  removeButtonTwo.addEventListener("click", () => {
    imagePreviewTwo.src = "";
    uploadedImgContainerTwo.classList.add('d-none');
    fileInputTwo.value = ""; 
  });
  // *************************** Upload Single Image js End here ***************************
  
  // *************************** Editor js start here ***************************
  const quill = new Quill('#editor', {
    modules: {
      syntax: true,
      toolbar: '#toolbar-container',
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
  });
  // *************************** Editor js End here ***************************

  // *************************** Select2 js start here ***************************
  $(document).ready(function() {
    $(".meta-tags").select2({
      tags: true
    });
  });
  // *************************** Select2 js End here ***************************

  
  // *************************** End date js start here ***************************
  function getDatePicker(receiveID) {
    flatpickr(receiveID, {
      enableTime: false, // Ensure time is disabled to match the format
      dateFormat: "d M, Y", // Format to match placeholder
      mode: "range", // Enable range selection
      minDate: "today", // Prevent past dates
    });
  }
  getDatePicker('#expiryDate');
  getDatePicker('#expiryDate2');
  // *************************** End date js End here ***************************

  
  // *************************** Suggested Recipient Dropdown js start ***************************
  $('body').on('click', function () {
    $('.recipient-dropdown').removeClass('show');
  });

  let inputText = "";
  $('.recipient-input').on('click', function (event) {
    event.stopPropagation();
    $('.recipient-dropdown').addClass('show');
  });

  $('.recipient-dropdown__text').on('click', function () {
    inputText = $(this).text();
    $('.recipient-input').val(inputText);
    $('.recipient-dropdown').removeClass('show');
  });

  // Search through Dropdown by input fields
  $('.recipient-input').on('input', function (event) {
    let inputText = event.target.value.toLowerCase();

    $('.recipient-dropdown li').each(function () {
      dropdownItemText = $(this).find('.recipient-dropdown__text').text().toLocaleLowerCase();
      $(this).toggleClass('d-flex', dropdownItemText.includes(inputText));
      $(this).toggleClass('d-none', !dropdownItemText.includes(inputText));
    });
  });
  // *************************** Suggested Recipient Dropdown js End ***************************
