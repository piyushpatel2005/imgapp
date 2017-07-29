$(document).ready(function() {
  console.log('DOM loaded');
  $("#post-comment").hide();
  $("#btn-comment").on("click", function(event) {
    event.preventDefault();
    $("#post-comment").show();
  });

  $("#btn-like").on("click", function(event) {
    event.preventDefault();

    var imgId = $(this).data('id');
    console.log(imgId);

    $.get("/images/" + imgId + "/like").done(function(data) {
      console.log(data);
      $(".likes-count").text(data.likes);
    }).fail(function() {
      console.log("Failed to get the likes count");
    });
  });
});
