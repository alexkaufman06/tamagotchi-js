$(document).ready(function() {

  $(document).bind('touchmove', function(e) {
  	e.preventDefault();
  });

  var player = { pennies: 0, dimes: 0, dollars: 0 };

  var tamagotchi = { food: 100, activity: 100, sleep: 100, money: 0, isDead: function() {
      if ((this.food <= 0) || (this.activity <= 0) || (this.sleep <= 0)) {
        return true;
      } else {
        return false;
      }
    }
  };

  var time = 0;
  var difficulty = 0;
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

  $('#buy-evolve').on('click', 'img', function () {
    tamagotchi.money -= 1;
    tamagotchi.food = 100;
    tamagotchi.activity = 100;
    tamagotchi.sleep = 100;
    $('#pokemon').attr('src', 'images/evolutionOne.gif');
    setTimeout(function(){ $('#pokemon').attr('src', 'images/charmeleon.gif'); }, 2250);
  });

  function timer() {
    // item controls

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
      $('#evolve').show();
      $('#buy-evolve').hide();
    }

    if (tamagotchi.money > 1) {
      $('#evolve').hide();
      $('#buy-evolve').removeClass('hide');
      $('#buy-evolve').show();
    }

    tamagotchi.money += .01;
    tamagotchi.food -= (.5 + difficulty);
    tamagotchi.activity -= (.5 + difficulty);
    tamagotchi.sleep -= (.5 + difficulty);
    time += .25;

    if (time % 5 === 0) {
      difficulty += .5;
    }

    if (tamagotchi.isDead() === true) {
      clearInterval(counter);
      alert("This webpage regrets to inform you that your tamagotchi has passed away after a long life of " + time + " seconds. Don't worry, you can try again!");
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
