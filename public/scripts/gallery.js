
var cardsContainer = document.getElementById("cards");
var moreBtn = document.getElementById("moreBtn");
var currentId = 1;

function addCard(filename) {
    var card = document.createElement("a");
    var img = document.createElement("img");
    img.src = "images/" + filename;
    img.width = 256;
    img.height = 256;
    card.href = "/snapshot/" + filename.replace(/.png$/, '');
    card.className = "card";
    card.id = filename;
    card.appendChild(img);
    cardsContainer.appendChild(card);
}

function addCards() {
    getJson("/images/" + currentId  + "/" + currentId + 9, function (data) {
        for (var i = 0; i < data.length; ++i) {
            addCard(data[i].filename);
        }
        currentId += data.length;
        moreBtn.style.display = data.length < 9 ? 'none' : 'inline';
    });
}

moreBtn.addEventListener("click", addCards);
addCards();