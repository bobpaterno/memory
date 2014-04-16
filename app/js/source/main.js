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
//    createTable();
  }

  function flip() {

  }

  // function createTable() {
  //   for(var i=0; i<numRows; i++) {
  //     addRow();
  //   }
  // }

  function startGame() {
    // Start clock
    clock = 60;
    $('#timer').removeClass('timer-warning');
    clearInterval(timer);
    timer = setInterval(updateClock, 200);
    $('tbody').empty();

    // Add cards by selecting images
    addRow();
    var $td = $('tbody > tr:nth-child(1) > td:nth-child(1)');
    var $img = $('<img>');
    $img.attr('src', '../media/1.png');
    $td.append($img);
  }


  function getImg() {
    var $td = $('<td>');
    var $img = $('<img>');
    var imgnum;

    imgnum = getRandomImage();

    $img.attr('src', '../media/'+imgnum+'.png');
    $td.append($img);
    return $td;
  }

  function getRandomImage() {
    
  }

  function addRow() {
//    var tds = [];
    numRows=numRows;
    var $tr = $('<tr>');
    for(var i=0; i<numCols; i++) {
      $tr.append(getImg());
      debugger;
//      $td = getImg();
//      tds.push('<td></td>');
    }
//    $tr.append(tds);
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
