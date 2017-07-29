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

    $.post("/images/" + imgId + "/like").done(function(data) {
      console.log(data);
      $(".likes-count").text(data.likes);
    }).fail(function() {
      console.log("Post failed");
    });
  });
});
