let simpsonsDeck = ["aces.png","aces.png","jacks.png","jacks.png","queen.png","queen.png","king.png","king.png","deep.jpg","deep.jpg"];
let bbDeck = ["bbace.jpg","bbace.jpg","bbqueen.jpg","bbqueen.jpg","bbjack.jpg","bbjack.jpg","bbking.jpg","bbking.jpg","bbjoker.jpg","bbjoker.jpg"];
let muppetDeck = ["muppetking.png","muppetking.png","muppetqueen.png","muppetqueen.png","muppetjack.png","muppetjack.png","muppetace.png","muppetace.png","muppetjoker.png","muppetjoker.png"];
let spe1Deck = ["spe1ace.jpg","spe1ace.jpg","spe1two.jpg","spe1two.jpg","spe1three.jpg","spe1three.jpg","spe1four.jpg","spe1four.jpg","spe1five.jpg","spe1five.jpg"];
let spe2Deck = ["spe2ace.jpg","spe2ace.jpg","spe2jack.jpg","spe2jack.jpg","spe2queen.jpg","spe2queen.jpg","spe2king.jpg","spe2king.jpg","spe2ten.jpg","spe2ten.jpg"];
let startBtn = document.getElementById('startBtn');
let start = document.getElementById('startModal');
let deck = document.getElementById('deckModal');
let startBtnSimp = document.getElementById('startBtnSimp');
let startBtnBB = document.getElementById('startBtnBB');
let startBtnMup = document.getElementById('startBtnMup');
let startBtnSpe1 = document.getElementById('startBtnSpe1');
let startBtnSpe2 = document.getElementById('startBtnSpe2');
startBtn.onclick = function() {
    start.style.display = "none";
    deck.style.display = "block";
};
startBtnSimp.onclick = function() {
    deck.style.display = "none";
    startG(simpsonsDeck);
};
startBtnBB.onclick = function() {
    deck.style.display = "none";
    startG(bbDeck);
};
startBtnMup.onclick = function() {
    deck.style.display = "none";
    startG(muppetDeck);
};
startBtnSpe1.onclick = function() {
    deck.style.display = "none";
    startG(spe1Deck);
};
startBtnSpe2.onclick = function() {
    deck.style.display = "none";
    startG(spe2Deck);
};
function startG(deckName) {
    for (i = 0; i < deckName.length; i++) {
        document.getElementsByClassName("front-card")[i].innerHTML += '<img class="testImg">';
        document.querySelectorAll("img.testImg")[i].src = "assets/"+deckName[i];
    }

}


function startGame() {
    
    const cards = document.querySelectorAll('.card');  
    cards.forEach(card => card.addEventListener('click', flip));
    let hasFlipped = false;
    let lockBoard = false;
    let turn = 0;
    document.getElementById("turn-made").innerHTML = turn;
    let firstCard, secondCard;
    let timer;
    let count = 60;  
    let matched = 0;  
    let restartBtn = document.getElementById('restartBtn');
    let over = document.getElementById('overModal');
    let finish = document.getElementById('finishModal');
    let againBtn = document.getElementById('againBtn');
    function shuffle() {
        cards.forEach(card => {
            let randomPosition = Math.floor(Math.random() * 10);
            card.style.order = randomPosition;
            
        })
    }
    function resetFlip() {
        cards.forEach(card => card.style.visibility = "visible");
        cards.forEach(card => card.classList.remove('flipped','matched'));
        
    }
    shuffle();
    resetFlip();
    
    function flip() {
        if (lockBoard) return;
        if (this == firstCard) return;
        this.classList.add('flipped');
        if (!hasFlipped) {
            hasFlipped = true;
            firstCard = this;
            return; 
        } 
            hasFlipped = false;
            secondCard = this;

            checkMatch();
            turnCounter();
    }  

    function checkMatch() {
        let isMatched = firstCard.dataset.framework === secondCard.dataset.framework;
        if (isMatched) {
            matched++;
            lockBoard = true;
            timerflip = setTimeout(removeMatched, 1000)
        } else {
            unflip();
        }
        done();
    }
    function removeMatched() {
        firstCard.style.visibility = "hidden";
        secondCard.style.visibility = "hidden";
        firstCard.removeEventListener('click', flip);
        secondCard.removeEventListener('click', flip);
        resetCard();
    }

    function unflip() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped'); 
            resetCard(); 
        }, 1000);
    }
    function resetCard() {
        [hasFlipped, lockBoard] = [false, false];
        [firstCard,secondCard] = [null, null];
    }
    resetCard();
    function turnCounter() {
        turn++;
        document.getElementById("turn-made").innerHTML = turn;
    }
    function done() {
        if (matched == 5) {
            finish.style.display = "block";
            clearTimeout(timer);
            clearTimeout(timerflip);
        }
    }
    function countdown() {
        if (count > 0)
        {
            timer = setTimeout(countdown, 1000);
            count -= 1;
            document.getElementById("time-remaining").innerHTML = count;
        }
        else
        {
            over.style.display = "block";
        }
    }
    countdown();
    function ending() {
        restartBtn.onclick = function () {
            over.style.display = "none";
            location.reload();
        };
        againBtn.onclick = function () {
            finish.style.display = "none";
            location.reload();
        };
    }
    ending();
    
}
window.onload = startGame()