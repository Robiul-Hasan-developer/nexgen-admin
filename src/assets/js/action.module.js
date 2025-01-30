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

  function getDatePickerSingle(receiveID) {
    flatpickr(receiveID, {
      enableTime: false, // Ensure time is disabled to match the format
      dateFormat: "d M, Y", // Format to match placeholder
    //   mode: "range", // Enable range selection
      minDate: "today", // Prevent past dates
    });
  }
  getDatePickerSingle('#dateTimeOne');
  getDatePickerSingle('#dateTimeSingle');

  
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