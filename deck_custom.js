
/* global Deck */

var prefix = Deck.prefix

var transform = prefix('transform')

var translate = Deck.translate

var $container = document.getElementById('myTable')
var $topbar = document.getElementById('topbar')

var $sort = document.createElement('button')
var $shuffle = document.createElement('button')
var $bysuit = document.createElement('button')
var $fan = document.createElement('button')
var $poker = document.createElement('button')
var $flip = document.createElement('button')
var $test = document.createElement('button')

$shuffle.textContent = 'Shuffle'
$sort.textContent = 'Sort'
$bysuit.textContent = 'By suit'
$fan.textContent = 'Fan'
$poker.textContent = 'Poker'
$flip.textContent = 'Flip'
$test.textContent = 'Test'

$topbar.appendChild($flip)
$topbar.appendChild($shuffle)
$topbar.appendChild($bysuit)
$topbar.appendChild($fan)
$topbar.appendChild($poker)
$topbar.appendChild($sort)
$topbar.appendChild($test)

var deck = Deck()

/* Personal Variables */
var startX = 1;
var deltaX = 50;
var startY = 1;
var deltaY = 80;
var row = 11;
var col = 5;
var colIndex = 1;
$test.addEventListener('click', function(){
  console.log("Pene");
  deck.cards.forEach(function (card, i) {
    card.setSide('back')
    if((i % row) == 0) colIndex++;
    var relPosX = startX + (i% row)*deltaX;
    var relPosY = startY + (colIndex)*deltaY;
    
	  console.log("relPosx: ", relPosX);
	  console.log("relPosy: ", relPosY);
    // explode
    card.animateTo({
        delay: 1000 + i * 2, // wait 1 second + i * 2 ms
        duration: 500,
		    ease: 'quartOut',
        x: relPosX,// * window.innerWidth - window.innerWidth / 2,
        y: relPosY// * window.innerHeight - window.innerHeight / 2
    })
})
  
});

$shuffle.addEventListener('click', function () {
  deck.shuffle()
  deck.shuffle()
})
$sort.addEventListener('click', function () {
  deck.sort()
})
$bysuit.addEventListener('click', function () {
  deck.sort(true) // sort reversed
  deck.bysuit()
})
$fan.addEventListener('click', function () {
  deck.fan()
})
$flip.addEventListener('click', function () {
  deck.flip()
})
$poker.addEventListener('click', function () {
  deck.queue(function (next) {
    deck.cards.forEach(function (card, i) {
      setTimeout(function () {
        card.setSide('back')
      }, i * 7.5)
    })
    next()
  })
  deck.shuffle()
  deck.shuffle()
  deck.poker()
})




function init(){
  
  deck.cards.forEach(function (card, i) {
    card.animateTo({
        x: 250,// * window.innerWidth - window.innerWidth / 2,
        y: -400// * window.innerHeight - window.innerHeight / 2
    })  
  });
  
}
deck.mount($container);
  deck.intro();
  deck.sort();
//init();

//deck.intro()
//deck.sort()



function printMessage (text) {
  var animationFrames = Deck.animationFrames
  var ease = Deck.ease
  var $message = document.createElement('p')
  $message.classList.add('message')
  $message.textContent = text

  document.body.appendChild($message)

  $message.style[transform] = translate(window.innerWidth + 'px', 0)

  var diffX = window.innerWidth

  animationFrames(1000, 700)
    .progress(function (t) {
      t = ease.cubicInOut(t)
      $message.style[transform] = translate((diffX - diffX * t) + 'px', 0)
    })

  animationFrames(6000, 700)
    .start(function () {
      diffX = window.innerWidth
    })
    .progress(function (t) {
      t = ease.cubicInOut(t)
      $message.style[transform] = translate((-diffX * t) + 'px', 0)
    })
    .end(function () {
      document.body.removeChild($message)
    })
}
