 // *****************************  Flat pickr or date picker js ***************************** 
 function getDatePickerSingle(receiveID) {
    flatpickr(receiveID, {
      enableTime: false, // Ensure time is disabled to match the format
      dateFormat: "d M, Y", // Format to match placeholder
    //   mode: "range", // Enable range selection
      minDate: "today", // Prevent past dates
    });
  }
  getDatePickerSingle('#dateTimeOne');
  getDatePickerSingle('#dateTimeTwo');
  getDatePickerSingle('#dateTimeThree');
    

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
  
  // *************************** Select2 js start here ***************************
  $(document).ready(function() {
    $(".meta-tags").select2({
      tags: true
    });
  });
  // *************************** Select2 js End here ***************************   
  
  
  // *************************** Sub Point js Start here ***************************   
  const addSubPointButton = document.querySelector('.add-subpoint-btn');
  const subPointsContainer = document.querySelector('.bg-white .row');

  addSubPointButton.addEventListener('click', () => {
    const subPointTemplate = subPointsContainer.querySelector('.col-12');

    if (subPointTemplate) {
      const clonedSubPoint = subPointTemplate.cloneNode(true);

      const paragraph = clonedSubPoint.querySelector('p');
      if (paragraph) {
        paragraph.textContent = 'New subpoint';
      }
      subPointsContainer.appendChild(clonedSubPoint);
    }
  });
  // *************************** Sub Point js End here ***************************   
