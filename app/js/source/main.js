(function() {
  'use strict';

  $(document).ready(init);

  var timer;
  var clock;
  var numRows=4;
  var numCols=5;

  function init() {
    createTable();
    layoutCards();
    $('#start').click(startGame);
    $('#animate').click(animate);
    $('#grid').on('click', 'td', flip);
  }

  function flip() {

  }

  function startGame() {
    startClock();
    createTable();
    layoutCards();
  }

  function layoutCards() {
      var cellIndex = genRandomIndex();
      for(var i=0; i< cellIndex.length; i++) {
        setImage(i, cellIndex[i]);
      }
  }

  function setImage(i, imgNum) {
    var $cell;
    var $img = $('<img>');

    $img.attr('src', '../media/' + imgNum + '.png');
    $cell = $($('tbody td')[i]);
    $cell.append($img);

  }

  function addRow() {
    var $tr = $('<tr>');
    var tds = [];
    for(var i=0; i<numCols; i++) {
        tds.push('<td></td>');
    }
    $tr.append(tds);
    $('tbody').append($tr);

  }

  function createTable() {
    for(var i=0; i<numRows; i++) {
      addRow();
    }
  }

  function startClock() {
    clock = 60;
    $('#timer').removeClass('timer-warning');
    clearInterval(timer);
    timer = setInterval(updateClock, 200);
    $('tbody').empty();

  }

  function updateClock() {
    clock--;
    if(clock===0){
      stopClock();
    }
    if(clock===10) {
      $('#timer').addClass('timer-warning');
    }
    $('#timer').text(clock);
  }

  function stopClock() {
    clearInterval(timer);
  }

  function genRandomIndex() {
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

  function animate() {
    $('.flipper').toggleClass('rotate');
  }

})();
