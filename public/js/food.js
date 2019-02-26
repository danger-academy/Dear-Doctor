/* eslint-disable prettier/prettier */
// When user clicks foodadd
$("#foodadd").on("click", function(event) {
  event.preventDefault();

  // Make a newfood object
  var newfood = {
    food: $("#foodtext").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/food", newfood)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#foodtext").val("");
});
