

$(document).ready(function () {
  $("#loader").hide();
})

$("form").submit(function (event) {
  event.preventDefault();
  $("#loader").show();
  var searchResult = $("#search").val()

  searchItunes(searchResult)
})


function searchItunes(query) {
  // AJAX IS GETTING DATA FROM ITUNES
  $.ajax({
    url: "https://itunes.apple.com/search?term=" + query,
    dataType: 'JSONP'
  })
    .done(function (data) {
      console.log(data);
      $("#loader").hide();
      // add code for when response from apple comes back.
      $('#songs').html("")
      var formattedData = [];
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].trackName) {
          // MAKE THIS SONG LIST BETTER
          $('#songs').prepend(`
                    <div class="col s12 m3">
                    <div class="card large">
                      <div class="card-image">
                        <img src="${data.results[i].artworkUrl100}">
                        <span class="card-title grey-text text-lighten-4">${data.results[i].trackName}</span>
                      </div>
                      <div class="card-content">
                      <p>${data.results[i].trackName}</p>
                        <p>${data.results[i].collectionName}</p>
                        <span class="amplitude-play-pause" data-amplitude-song-index="${i}">
                        <i class="material-icons play">play_arrow</i>
                        <i class="material-icons pause">pause</i>
                        </span>
                      </div>
                      <div class="card-action">
                        <a href="${data.results[i].trackViewUrl}">Go to song</a>
                      </div>
                    </div>
                  </div>              
                    `);

          formattedData.push({
            "name": data.results[i].trackName,
            "artist": data.results[i].artistName,
            "album": data.results[i].collectionName,
            "url": data.results[i].previewUrl,
            "cover_art_url": data.results[i].artworkUrl100
          })
        }
      }
      Amplitude.init({
        "songs": formattedData
      })
    })
    .fail(function (data) {
      console.log(data);
      $('#songs').append(data.status);
    })

}


