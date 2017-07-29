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

  $("#btn-delete").on("click", function(event) {
    event.preventDefault();
    var $this = $(this);

    var remove = confirm("Are you sure you want to delete this image?");
    if(remove) {
      var imgId = $(this).data('id');
      $.ajax({
        url: '/images/' + imgId,
        type: 'DELETE'
      }).done(function(result) {
        if(result) {
          $this.removeClass('btn-danger').addClass("btn-success");
          $this.find('i').removeClass('fa-times').addClass('fa-check');
          $this.append("<span>Deleted!</span>");
        }
      });
    }
  });
});
