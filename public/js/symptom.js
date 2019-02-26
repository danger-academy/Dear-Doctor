/* eslint-disable prettier/prettier */
// When user clicks symptomadd
$("#symptomadd").on("click", function(event) {
  event.preventDefault();

  // Make a newsymptom object
  var newsymptom = {
    symptom: $("#symptomtext").val().trim(),
    severity: $("#symptomseverity").val().trim()
  };

  // Send an AJAX POST-request with jQuery
  $.post("/api/symptom", newsymptom)
    // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });

  // Empty each input box by replacing the value with an empty string
  $("#symptomtext").val("");
});
