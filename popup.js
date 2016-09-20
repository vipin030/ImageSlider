/* Update the relevant fields with the new data */
function setDOMInfo(info) 
{
  
  var images=JSON.parse(info);
  $(document).ready(function()
  {

    $.get("profile.json",function(data)
    {
      var jsonData=$.parseJSON(data);
      $("#tittle").text(jsonData.title);
      $("#desc").text(jsonData.desc);
      var profList="";
      $.each(jsonData.profiles,function(i,data)
      {
        profList += '<li class="list-group-item">'+
                    '<div class="media">'+
                    '<div class="media-left">'+
                    '<a href="#">'+
                    '<img class="media-object" src="'+data.imageRef+'" width="35" height="35">'+
                    '</a>'+
                    '</div>'+
                    '<div class="media-body">'+
                    '<h5 class="media-heading">'+data.fullName+'</h5>'+
                    '<small>'+data.notes+'</small>'+
                    '</div>'+
                    '</div>'+
                    '</li>';
      });
      $("#profile").append(profList);
    });

    for(var i=0 ; i< images.length ; i++) 
    {
      $('<div class="item"><center><img src="'+images[i]+'" width="300" height="200"></center><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')

    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();
  });
   
}

/* Once the DOM is ready... */
window.addEventListener('DOMContentLoaded', function() {
    /* ...query for the active tab... */
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        /* ...and send a request for the DOM info... */
        chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'DOMInfo'},
                /* ...also specifying a callback to be called 
                 *    from the receiving end (content script) */
                setDOMInfo);
    });
});
