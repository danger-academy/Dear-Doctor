/* eslint-disable prettier/prettier */
// When user clicks drinkadd
$("#drinkadd").on("click", function(event) {
  event.preventDefault();

  // Make a newdrink object
  var newdrink = {
    drink: $("#drinktext").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/drink", newdrink)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#drinktext").val("");
});
