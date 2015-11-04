/* your code should go here */


// Three main classes of cards:
// done: when the user has discovered the pair of cards
// hidden: when the card has not been discovered yet

var Card = {
    lastCard: 1,
    loadCard: function() {
        data.forEach(function(number) {    
            card = $("#template").clone();
            card.removeAttr("style");
            card.removeAttr("id");
            
            card.attr("value", number);
            card.children().html(number);
            
            card.click(Card.listener);
            
            card.appendTo(".cards");
        })
    },
    
    listener: function (event) {
        if ($(this).hasClass("done")) {
            return;
        }
        cardNumber = $(this).attr("value");
        if (cardNumber == Card.lastCard) {
            Card.lastCard += 1;        
            $(this).removeClass("hidden").addClass("done animated tada");
        } else {
            Card.lastCard = 1;
            alert("You lost!");
            Game.enableButton();
        }
    },
    showCards: function() {
        
    }
}

var Game = {
    eventHandler: function () {
        Game.button = $("#start");
        Game.button.one("click", Game.startGame);
    },
    startGame: function(event) {
        Game.button.attr("disabled" ,"");
        cards = $(".cards>li");
        var timeout = 0;
        cards.each(function (index) {
            var item = $(this);
            setTimeout(function() {
                item.removeClass("done").addClass("hidden fadeInDown animated");
            }, timeout+=100);
        });
    },
    enableButton: function() {
        Game.button.removeAttr("disabled");
        Game.eventHandler();
    },
    failGame: function() {
        alert("You lost!");
        Game.enableButton();
        Card.showCards();
    }

}
$(document).ready(function(){
    Game.eventHandler();
   Card.loadCard(); 
});







