var retryBtn = document.getElementById("retryBtn");
var facebookBtn = document.getElementById("facebookBtn");

retryBtn.addEventListener("click", function () {
    window.location.href = "/";
});

function changeProfilePicture() {
    FB.api('/me/feed', 'post', {message: '#jeSuisCharlie'});
}

facebookBtn.addEventListener("click", function () {
    window.alert("Not implemented yet, sorry :/")
    ////FB.login(function(){
    ////    console.log("TODO");
    ////}, {scope: 'publish_actions'});
    //FB.getLoginStatus(function(response) {
    //    if (response.status === 'connected') {
    //        changeProfilePicture();
    //    }
    //    else {
    //        FB.login(changeProfilePicture);
    //    }
    //});
});