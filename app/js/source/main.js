(function() {
  'use strict';

  $(document).ready(init);

  var timer;
  var clock;
  var numRows=4;
  var numCols=5;
  var cards=[];
  var isWin = false;
  var isPlaying = false;
  var DIFFICULTY = 650; // milliseconds timer

  function init() {
    cards = shuffle();
    $('#start').click(startGame);
    $('.card').click(flip);
    $('.button-reset').click(startGame);
    $('#notice').attr('visibility', 'hidden');
    $('.gameboard').css('display', 'none');
  }

  function startGame() {
    isWin = false;
    isPlaying = true;
    $('#timer').toggleClass('timer-active');
    cards = shuffle();
    $('.gameboard').delay(150);
    $('.controller').fadeOut(500);
    $('.gameboard').fadeIn(250);
    clearBoard();
    startClock();
  }

  function flip() {
    if(!isMatched($(this)) && isPlaying ) {
      turnOverCard(this);
      check4Match(this);
      checkWin();
    }
  }

  function check4Match(curr) {
    var $flipped = $('.selected');
    var card1 = $flipped[0];
    var card2 = $flipped[1];
    var img1 = $(card1).data('idx');
    var img2 = $(card2).data('idx');

    if ($flipped.length===2) {
      if(cards[img1]===cards[img2]) { // if cards match
        $flipped.addClass('matched');
      }
      else {
        setTimeout(function(){
          $flipped.find('.flipper').removeClass('rotate');
          setTimeout(function() {
              $(curr).find('.back').css('background-image', '');
          }, 700);
        }, 700);
      }
      $flipped.removeClass('selected');
    }
  }

  function checkWin() {
    if($('.matched').length === numRows*numCols) {
      stopClock(timer);
      displayNotice('Congratulations, you win!!');
      isWin = true;
      isPlaying = false;
    }
  }

  function turnOverCard(curr) {
    var index = $(curr).data('idx');
    var img = cards[index];
    $(curr).find('.back').css('background-image', 'url("./media/'+img+'.png")');
    $(curr).find('.flipper').addClass('rotate');
    $(curr).addClass('selected');
  }

  function clearBoard() {
    $('.matched, .selected, .flipper').removeClass('matched selected rotate');
  }

  function startClock() {
    clock = $('#timer').data('time')*1;
    $('#timer').removeClass('timer-warning');
    clearInterval(timer);
    timer = setInterval(updateClock, DIFFICULTY);
  }

  function updateClock() {
    clock--;
    $('#timer').text(clock);

    if(clock===0){
      stopClock();
      if(!isWin) {
        displayNotice('Sorry, you lose.');
        isPlaying = false;
      }
    }
    if(clock===20) {
      $('#timer').addClass('timer-warning');
    }
  }

  function stopClock() {
    clearInterval(timer);
  }

  function isMatched(card) {
    return $(card).hasClass('matched');
  }

  function shuffle() {
    var rn;
    var a=[];
    var numCells = (numRows * numCols);
    while(a.length < numCells) {
      rn = Math.floor(numCells*Math.random());
      if(!inArray(rn,a)) {
        a.push(rn);
      }
    }
    for(var i=0; i< numCells; i++) {
      a[i] = Math.floor(a[i]/2);
    }
    return a;
  }

  function inArray(n, arr) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i]===n) {
        return true;
      }
    }
    return false;
  }

  function displayNotice(notice) {
    var $notice = $('#notice');
    $notice.text(notice);
    $notice.fadeIn(500);
    $notice.delay(3300);
    $notice.fadeOut(1000);
  }
})();
