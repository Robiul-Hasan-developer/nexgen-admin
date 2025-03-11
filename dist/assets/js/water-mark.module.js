 // ***************************** Data Table js ***************************** 
 new DataTable('#example', {
    searching: false,   // Removes the search box
    lengthChange: false, 
    rowReorder: true
  });

  // *****************************  Flat pickr or date picker js ***************************** 
  function getDatePicker(receiveID) {
    flatpickr(receiveID, {
      enableTime: false, // Ensure time is disabled to match the format
      dateFormat:"d M, Y", // Format to match placeholder
      mode:"range", // Enable range selection
      minDate:"today", // Prevent past dates
    });
  }
  getDatePicker('#dateTime');
  // *****************************  Flat pickr or date picker js ***************************** 
  
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