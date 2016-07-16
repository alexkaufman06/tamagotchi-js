$(document).ready(function() {

  $(document).bind('touchmove', function(e) {
  	e.preventDefault();
  });

  var tamagotchi = { food: 100, activity: 100, sleep: 100, money: 0, level: 1, evolution: 1, isDead: function() {
      if ((this.food <= 0) || (this.activity <= 0) || (this.sleep <= 0)) {
        return true;
      } else {
        return false;
      }
    }, pokeMaster: function() {
      if (this.level === 99) {
        return true;
      } else {
        return false;
      }
    }
  };

  var time = 0;
  var difficulty = 0;
  var cheatCode = 0;
  var counter = setInterval(timer, 250);

  // functions for buttons

  $('#feed').click(function() {
    tamagotchi.food += 5;
  });

  $('#play').click(function() {
    tamagotchi.activity += 5;
  });

  $('#sleep').click(function() {
    tamagotchi.sleep += 5;
  });

  // shop buttons

  $('#buy-potion').on('click', 'img', function () {
    tamagotchi.food += 30;
    tamagotchi.activity += 30;
    tamagotchi.sleep += 30;
    tamagotchi.money -= .5;
    $('.money').empty();
    $('.money').append(Math.round(tamagotchi.money * 100)/100);
  });

  $('#buy-level-up').on('click', 'img', function () {
    tamagotchi.level += 1;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    tamagotchi.money -= 1;
    $('.level').empty();
    $('.level').append(tamagotchi.level);
  });

  $('#buy-evolve').on('click', 'img', function () {
    tamagotchi.money -= 5;
    tamagotchi.evolution += .5;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    alert('...What?\nCharmander is evolving!');
    $('#pokemon').attr('src', 'images/evolutionOne.gif');
    setTimeout(function(){ $('#pokemon').attr('src', 'images/charmeleon.gif'); }, 2250);
    setTimeout(function(){ alert('Charmander evolved into Charmeleon!'); }, 2750);
  });

  $('#buy-evolve2').on('click', 'img', function () {
    tamagotchi.money -= 10;
    tamagotchi.evolution += .5;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    alert('...What?\nCharmeleon is evolving!')
    $('#pokemon').attr('src', 'images/evolutionTwo.gif');
    setTimeout(function(){ $('#pokemon').attr('src', 'images/evolutionThree.gif'); }, 3150);
    setTimeout(function(){ alert('Charmeleon evolved into Charizard!'); }, 4249);
    setTimeout(function(){ $('#pokemon').attr('src', 'images/charizard.gif'); }, 4250);

  });

  function timer() {
    // shop prices

    if (tamagotchi.money < .5) {
      $('#potion').show();
      $('#buy-potion').hide();
    }

    if (tamagotchi.money > .5) {
      $('#potion').hide();
      $('#buy-potion').removeClass('hide');
      $('#buy-potion').show();
    }

    if (tamagotchi.money < 1) {
      $('#level-up').show();
      $('#buy-level-up').hide();
    }

    if (tamagotchi.money > 1) {
      $('#level-up').hide();
      $('#buy-level-up').removeClass('hide');
      $('#buy-level-up').show();
    }

    if (tamagotchi.money < 5 || tamagotchi.evolution == 2) {
      $('#evolve').show();
      $('#buy-evolve').hide();
      $('#buy-evolve2').hide();
    }

    if (tamagotchi.money > 5  && tamagotchi.evolution == 1) {
      $('#evolve').hide();
      $('#buy-evolve').removeClass('hide');
      $('#buy-evolve').show();
    }

    if (tamagotchi.money > 10 && tamagotchi.evolution == 1.5) {
      $('#evolve').hide();
      $('#buy-evolve').hide();
      $('#buy-evolve2').removeClass('hide');
      $('#buy-evolve2').show();
    }

    tamagotchi.money += (.01 * tamagotchi.level);
    tamagotchi.food -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    tamagotchi.activity -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    tamagotchi.sleep -= (1.2 + difficulty - cheatCode - (tamagotchi.level * tamagotchi.evolution));
    time += .25;

    if (time % 5 === 0) {
      difficulty += .5;
    }

    if (tamagotchi.isDead() === true) {
      clearInterval(counter);
      alert("This webpage regrets to inform you that your tamagotchi has passed away after a long life of " + time + " seconds...\n\nDon't worry, you can try again!");
      location.reload();
    }

    //keep level from going over 99

    if (tamagotchi.level > 99) {
      tamagotchi.level = 99;
    }

    if (tamagotchi.pokeMaster() === true) {
      $('.level').empty();
      $('.level').append(tamagotchi.level);
      clearInterval(counter);
      alert("Wow! You have reached level 99.\nCongrats on becoming a pokemaster!\nThanks for playing!");
      location.reload();
    }

    // logic to stop level from going above 100 (refac

    if (tamagotchi.food > 100) {
      tamagotchi.food = 100;
    }

    if (tamagotchi.activity > 100) {
      tamagotchi.activity = 100;
    }

    if (tamagotchi.sleep > 100) {
      tamagotchi.sleep = 100;
    }

    // logic for changing color of progress bars

    if (tamagotchi.food > 65) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.food < 65 && tamagotchi.food > 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.food < 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.activity > 65) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.activity < 65 && tamagotchi.activity > 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.activity < 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchi.sleep > 65) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchi.sleep < 65 && tamagotchi.sleep > 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchi.sleep < 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-danger');
    }

    // computer keyboard controls

    $(document).keydown(function(e) {
      if (e.which === 37) {
        tamagotchi.food += .025;
      } else if (e.which === 40) {
        tamagotchi.activity += .025;
      } else if (e.which === 39) {
        tamagotchi.sleep += .025;
      } else if (e.which == 77 && e.ctrlKey) {
        tamagotchi.money += 1;
        cheatCode = 1000;
      }
    });

    // logic for changing value of progress bars, stats, and updating money count

    $('#food-level').css('width', tamagotchi.food + "%");
    $('#activity-level').css('width', tamagotchi.activity + "%");
    $('#sleep-level').css('width', tamagotchi.sleep + "%");
    $('.money').empty();
    var moneyRounded = Math.round(tamagotchi.money * 100)/100;
    $('.money').append(moneyRounded.toFixed(2));
    $('.sleep').empty();
    $('.sleep').append(tamagotchi.sleep.toFixed());
    $('.activity').empty();
    $('.activity').append(tamagotchi.activity.toFixed());
    $('.food').empty();
    $('.food').append(tamagotchi.food.toFixed());
  }

});
