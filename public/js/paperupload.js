// This file includes the logic behind uploading papers and related data.

"use strict"

$("#uploadButton").click(function() {
  
  // Prevent multiple form submissions.
  if(! $("#uploadButton").hasClass("disabled")) {

    // Check if form data is complete.
    if ($('#title').val() == "" || $('#author').val() == "" || $('#publication_date').val() == "" || $('#texfile').val() == "") {
      alert("Data incomplete! Title, author, date and a *.tex file are required.");
      return;
    }

    // Change button... They get changed back in error() and success().
    $('#uploadButton').addClass("disabled");
    $('#uploadButton').html("Uploading...");

    // Send data...
    var formData = new FormData($("#paperform")[0]);

    $.ajax({
      url: 'http://localhost:8080/addPaper',
      type: 'POST',
      data: formData,
      success: function() {
        alert("Upload successful!");
        $('#paperUploadModal').modal('hide');
        $('#uploadButton').removeClass("disabled");
        $('#uploadButton').html("Upload");
      },
      error: function(jqxhr, textstatus, error) {
        alert("Upload failed! Reason: " + error);
        $('#paperUploadModal').modal('hide');
        $('#uploadButton').removeClass("disabled");
        $('#uploadButton').html("Upload");
      },
      timeout: 15000,
      cache: false,
      contentType: false,
      processData: false
    });
  }
});