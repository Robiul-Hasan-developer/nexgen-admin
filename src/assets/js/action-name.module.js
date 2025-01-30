 // ***************************** Data Table js ***************************** 
 if ($('#example').length) {
    new DataTable('#example', {
    searching: false,   // Removes the search box
    lengthChange: false, 
    // paging: false,      // Disables pagination
    // ordering: false     // Disables column ordering
    });
}

// *************************** Editor js start here ***************************
if ($('#editor').length) {
    const quill = new Quill('#editor', {
    modules: {
        syntax: true,
        toolbar: '#toolbar-container',
    },
    placeholder: 'Compose an epic...',
    theme: 'snow',
    });
}
// *************************** Editor js End here ***************************

// *************************** Select2 js start here ***************************
$(document).ready(function() {
    $(".meta-tags").select2({
    tags: true
    });
});
// *************************** Select2 js End here ***************************

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
    let dropdownItemText = $(this).find('.recipient-dropdown__text').text().toLocaleLowerCase();
    $(this).toggleClass('d-flex', dropdownItemText.includes(inputText));
    $(this).toggleClass('d-none', !dropdownItemText.includes(inputText));
    });
});
// *************************** Suggested Recipient Dropdown js End ***************************