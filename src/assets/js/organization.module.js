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
  