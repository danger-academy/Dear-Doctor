
// Make a get request to our api route that will return complete diary
$.get("/api/diary", function(data) {
  // For each diary entry that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // Create a parent div to hold diary data
    var wellSection = $("<tr>");
    // Add a class to this div: 'well'
    wellSection.addClass("well");
    // Add an id to the well to mark which well it is
    wellSection.attr("id", "diary-well-" + i);
    // Append the well to the well section
    $("#well-section").append(wellSection);

    let currentTime = data[i].createdAt.toString(); 

    let formatedTime = moment(currentTime).format("MM/DD/YYYY h:mm:ss a");

    // Now  we add our diary data to the well we just placed on the page
    // eslint-disable-next-line prettier/prettier
    
    if (data[i].symptom !== null) { 
      $("#diary-well-" + i).append("<td>" + formatedTime + "</td>");
      $("#diary-well-" + i).append("<td>Symptom: " + data[i].symptom + "</td>");
    } else if (data[i].food !== null) {
      $("#diary-well-" + i).append("<td>" + formatedTime + "</td>");
      $("#diary-well-" + i).append("<td>Food: " + data[i].food + "</td>");
    } else if (data[i].drink !== null) {
      $("#diary-well-" + i).append("<td>" + formatedTime + "</td>");
      $("#diary-well-" + i).append("<td>Drink: " + data[i].drink + "</td>");
    }
  }
});