$(document).ready(function() {

  $(document).bind('touchmove', function(e) {
  	e.preventDefault();
  });

  var player = { pennies: 0, dimes: 0, dollars: 0 };

  var tamagotchiOne = { food: 100, activity: 100, sleep: 100, isDead: function() {
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

  // functions for buttons (refactor)

  $('#feed').click(function() {
    tamagotchiOne.food += 5;
  });

  $('#play').click(function() {
    tamagotchiOne.activity += 5;
  });

  $('#sleep').click(function() {
    tamagotchiOne.sleep += 5;
  });

  function timer() {
    player.pennies += 1;
    tamagotchiOne.food -= (.5 + difficulty);
    tamagotchiOne.activity -= (.5 + difficulty);
    tamagotchiOne.sleep -= (.5 + difficulty);
    time += .25;

    if (time % 5 === 0) {
      difficulty += .5;
    }

    if (tamagotchiOne.isDead() === true) {
      clearInterval(counter);
      alert("This webpage regrets to inform you that your tamagotchi has passed away after a long life of " + time + "s. Don't worry, you can try again!");
      location.reload();
    }

    if (player.pennies === 10) {
      player.dimes += 10;
      player.pennies -=10;
      $('.dimes').empty();
      $('.dimes').append(player.dimes);
    }

    if (player.dimes === 100) {
      player.dollars += 1;
      player.dimes -= 100;
      $('.dimes').empty();
      $('.dimes').append(player.dimes);
      $('.dollars').empty();
      $('.dollars').append(player.dollars);
    }

    // logic to stop level from going above 100 (refactor)

    if (tamagotchiOne.food > 100) {
      tamagotchiOne.food = 100;
    }

    if (tamagotchiOne.activity > 100) {
      tamagotchiOne.activity = 100;
    }

    if (tamagotchiOne.sleep > 100) {
      tamagotchiOne.sleep = 100;
    }

    // logic for changing color of progress bars (refactor)

    if (tamagotchiOne.food > 65) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchiOne.food < 65 && tamagotchiOne.food > 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchiOne.food < 30) {
      $('#food-level').removeClass();
      $('#food-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchiOne.activity > 65) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchiOne.activity < 65 && tamagotchiOne.activity > 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchiOne.activity < 30) {
      $('#activity-level').removeClass();
      $('#activity-level').addClass('progress-bar progress-bar-danger');
    }

    if (tamagotchiOne.sleep > 65) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-success');
    } else if (tamagotchiOne.sleep < 65 && tamagotchiOne.sleep > 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-warning');
    } else if (tamagotchiOne.sleep < 30) {
      $('#sleep-level').removeClass();
      $('#sleep-level').addClass('progress-bar progress-bar-danger');
    }

    // computer keyboard controls

    $(document).keydown(function(e) {
      if (e.which === 37) {
        tamagotchiOne.food += .025;
      } else if (e.which === 40) {
        tamagotchiOne.activity += .025;
      } else if (e.which === 39) {
        tamagotchiOne.sleep += .025;
      }
    });

    // logic for changing value of progress bars and updating penny count

    $('#food-level').css('width', tamagotchiOne.food + "%");
    $('#activity-level').css('width', tamagotchiOne.activity + "%");
    $('#sleep-level').css('width', tamagotchiOne.sleep + "%");
    $('.pennies').empty();
    $('.pennies').append(player.pennies);
  }

});
