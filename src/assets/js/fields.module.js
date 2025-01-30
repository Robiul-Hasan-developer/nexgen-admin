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
  // *****************************  Flat pickr or date picker js ***************************** 
  
  // ***************************** Bold Italic Underline Btn js ***************************** 
  $('.bold-btn').on('click', function () {
      $(this).toggleClass('bg-neutral-300');
      $('.sample-text').toggleClass('fw-bold');
  }); 
  $('.italic-btn').on('click', function () {
      $(this).toggleClass('bg-neutral-300');
      $('.sample-text').toggleClass('fst-italic');
  }); 
  $('.underline-btn').on('click', function () {
      $(this).toggleClass('bg-neutral-300');
      $('.sample-text').toggleClass('text-decoration-underline');
  }); 
  // ***************************** Bold Italic Underline Btn js ***************************** 
