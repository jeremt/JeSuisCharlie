var retryBtn = document.getElementById("retryBtn");
var facebookBtn = document.getElementById("facebookBtn");

retryBtn.addEventListener("click", function () {
    window.location.href = "/";
});

facebookBtn.addEventListener("click", function () {
    window.alert("Not implemented yet, sorry :/")
    sendJson("/post", {}, function (data) {
        console.log(data);
    });
    // test that the app is working
    //FB.login(function(){
    //    FB.api('/me/feed', 'post', {message: 'Test API #jeSuisCharlie'}, function (response) {
    //        console.log(response);
    //    });
    //}, {scope: 'publish_actions,manage_pages', return_scopes: true, auth_type: 'requested'});

    // upload picture
    //
    //FB.api(
    //    "/me/photos",
    //    "POST",
    //    {
    //        "url": "http://noussommescharlie.heroku.com/images/" + currentId + ".png"
    //    },
    //    function (response) {
    //        if (response && !response.error) {
    //            console.log(response);
    //        }
    //    }
    //);

    // make profile picture
    //https://www.facebook.com/photo.php?fbid={photo_id}&makeprofile=1&makeuserprofile=1
});