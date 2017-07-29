module.exports = {
  newest: function () {
    var comments = [
      {
        image_id: 1,
        email: 'test@test.com',
        name: "Test user",
        gravatar: "http://lorempixel.com/75/75/animals/1",
        comment: "This is a comment",
        timestamp: Date.now(),
        image: {
          uniqueId: 1,
          title: "Sample Image 1",
          description: "",
          filename: "sample1.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now()
        }
      },
      {
        image_id: 1,
        email: 'test@test.com',
        name: "Test user",
        gravatar: "http://lorempixel.com/75/75/animals/2",
        comment: "This is a comment",
        timestamp: Date.now(),
        image: {
          uniqueId: 1,
          title: "Sample Image 1",
          description: "",
          filename: "sample1.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now()
        }
      }
    ];

    return comments;
  }
}
