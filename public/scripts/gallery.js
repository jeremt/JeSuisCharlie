
var cardsContainer = document.getElementById("cards");
var moreBtn = document.getElementById("moreBtn");

moreBtn.addEventListener("click", function () {
    var currentCards = document.getElementsByClassName("card");
    var currentId = currentCards[currentCards.length - 1].id - 1;
    for (var i = currentId; i >= 0 && i > currentId - 9; --i) {
        var card = document.createElement("div");
        var img = document.createElement("img");
        img.src = "images/" + i + ".png";
        img.width = 256;
        img.height = 256;
        card.className = "card";
        card.id = i.toString();
        card.appendChild(img);
        cardsContainer.appendChild(card);
    }
    if (currentId - 9 <= 0) {
        moreBtn.style.display = 'none';
    }
});