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
  // const addSubPointButton = document.querySelector('.add-subpoint-btn');
  // const subPointsContainer = document.querySelector('.bg-white .row');

  // addSubPointButton.addEventListener('click', () => {
  //   const subPointTemplate = subPointsContainer.querySelector('.col-12');

  //   if (subPointTemplate) {
  //     const clonedSubPoint = subPointTemplate.cloneNode(true);

  //     // Find the paragraph inside the cloned subpoint
  //     let paragraph = clonedSubPoint.querySelector('p');
      
  //     if (paragraph) {
  //       // Replace paragraph with an editable input field
  //       const input = document.createElement('input');
  //       input.type = 'text';
  //       input.className = 'form-control subpoint-input';
  //       input.value = 'New subpoint';
        
  //       // Replace paragraph with the input field
  //       paragraph.replaceWith(input);
  //     }

  //     subPointsContainer.appendChild(clonedSubPoint);
  //   }
  // });

  document.querySelectorAll('.add-subpoint-btn').forEach((button) => {
    button.addEventListener('click', function () {
      // Find the closest section containing this button
      const subPointsContainer = this.closest('.col-12').querySelector('.bg-white .row');
  
      if (subPointsContainer) {
        const subPointTemplate = subPointsContainer.querySelector('.col-12');
  
        if (subPointTemplate) {
          const clonedSubPoint = subPointTemplate.cloneNode(true);
  
          // Find the paragraph inside the cloned subpoint and replace it with an editable input
          let paragraph = clonedSubPoint.querySelector('p');
  
          if (paragraph) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control subpoint-input';
            input.value = 'New subpoint';
            
            paragraph.replaceWith(input);
          }
  
          subPointsContainer.appendChild(clonedSubPoint);
        }
      }
    });
  });
  // *************************** Sub Point js End here ***************************   

  
  // *************************** Bootstrap Tab Next Previous js start ***************************   
  function showTab(index) {
    $('#pills-tabThree li:nth-child(' + index + ') a').tab('show');
  }

  for (let i = 1; i <= 6; i++) {
    // Next buttons
    $("#next-btn" + i).on("click", function () {
      showTab(i + 1);
    });

    // Previous buttons
    $("#prev-btn" + i).on("click", function () {
      showTab(i);
    });
  }


  // $("#next-btn1").click(function () {
  //   $('#pills-tabThree li:nth-child(2) a').tab('show');
  // });
  // $("#next-btn2").click(function () {
  //   $('#pills-tabThree li:nth-child(3) a').tab('show');
  // });
  // $("#next-btn3").click(function () {
  //   $('#pills-tabThree li:nth-child(4) a').tab('show');
  // });
  // $("#next-btn4").click(function () {
  //   $('#pills-tabThree li:nth-child(5) a').tab('show');
  // });
  // $("#next-btn5").click(function () {
  //   $('#pills-tabThree li:nth-child(6) a').tab('show');
  // });


  // $("#prev-btn1").click(function () {
  //   $('#pills-tabThree li:nth-child(1) a').tab('show');
  // });
  // $("#prev-btn2").click(function () {
  //   $('#pills-tabThree li:nth-child(2) a').tab('show');
  // });
  // $("#prev-btn3").click(function () {
  //   $('#pills-tabThree li:nth-child(3) a').tab('show');
  // });
  // $("#prev-btn4").click(function () {
  //   $('#pills-tabThree li:nth-child(4) a').tab('show');
  // });
  // $("#prev-btn5").click(function () {
  //   $('#pills-tabThree li:nth-child(5) a').tab('show');
  // });
  // *************************** Bootstrap Tab Next Previous js end ***************************   
