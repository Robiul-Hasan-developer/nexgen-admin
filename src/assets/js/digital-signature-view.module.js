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

// ========================= focus underline Js start ===================
$('body').on('click', function () {
  $('.click-underline').removeClass('text-decoration-underline');
});
$('.click-underline').on('click', function (event) {
  event.stopPropagation();
  $('.click-underline').removeClass('text-decoration-underline');
  $(this).addClass('text-decoration-underline');
});
$('.modal').on('click', function (event) {
  event.stopPropagation();
});
// ========================= focus underline Js End ===================

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
