(function() {
  'use strict';

// $('#game').on('click', 'td', doSomething);

  $(document).ready(init);

  var timer;
  var clock;
  var numRows=4;
  var numCols=5;

  function init() {
    $('#start').click(startGame);
    $('#animate').click(animate);
    $('#grid').on('click', 'td', flip);
    createTable();
  }

  function flip() {

  }

  function createTable() {
    for(var i=0; i<numRows; i++) {
      addRow();
    }
  }

  function startGame() {
    // Start clock
    clock = 60;
    $('#timer').removeClass('timer-warning');
    clearInterval(timer);
    timer = setInterval(updateClock, 200);

    // Add cards by selecting images
  }


  function addRow() {
    var $tr = $('<tr>');
    var tds = [];

    for(var i=0; i<numCols; i++) {
      tds.push('<td></td>');
//      $img = placeImg();
//      $img.attr('src', '../media/1.png');
//      $tr.append($(tds[i]).append($img));
    }
    $tr.append(tds);
    $('tbody').append($tr);
  }


  function updateClock() {
    clock--;
    if(clock===0){
      clearInterval(timer);
      timesUp();
    }
    if(clock===10) {
      $('#timer').addClass('timer-warning');
    }
    $('#timer').text(clock);
  }



  function timesUp() {

  }


  function animate() {
    $('.flipper').toggleClass('rotate');
  }

})();
