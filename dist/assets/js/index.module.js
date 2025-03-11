  // ***************************** Data Table js ***************************** 
  new DataTable('#example', {
    searching: false,   // Removes the search box
    lengthChange: false, 
    // paging: false,      // Disables pagination
    // ordering: false     // Disables column ordering
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
  getDatePicker('#dateTime');
  getDatePicker('#dateTimeTwo');
  getDatePicker('#dateTimeThree');
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

  // *************************** PDF js Start ***************************
  const template = document.createElement('template');
  template.innerHTML = `
    <iframe frameborder="0" 
      width="1280" 
      height="900">
    </iframe>
  `
  class PdfViewer extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.appendChild(template.content.cloneNode(true))
    }
    get observedAttributes() {
      return ['src']
    }
    connectedCallback() {
      this.updateIframeSrc()
    }
    attributeChangedCallback(name) {
      if (['src', 'viewerPath'].includes(name)) {
        this.updateIframeSrc()
      }
    }
    updateIframeSrc() {
      this.shadowRoot.querySelector('iframe').setAttribute(
        'src', 
        `https://mozilla.github.io/pdf.js/web/viewer.html?file=${this.getAttribute('src') || ''}`
      )
    }
  }
  window.customElements.define('pdf-viewer', PdfViewer)
  // *************************** PDF js End ***************************