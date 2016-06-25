$(document).ready(function() {

  var player = { pennies: 0, dimes: 0, dollars: 0 };

  var tamagotchiOne = { food: 100, activity: 100, sleep: 100 };

  var counter = setInterval(timer, 250);

  function timer() {
    player.pennies += 1;
    tamagotchiOne.food -= .5;
    tamagotchiOne.activity -= .5;
    tamagotchiOne.sleep -= .5;

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

    $('#food-level').css('width', tamagotchiOne.food + "%");
    $('#activity-level').css('width', tamagotchiOne.activity + "%");
    $('#sleep-level').css('width', tamagotchiOne.sleep + "%");
    $('.pennies').empty();
    $('.pennies').append(player.pennies);
  }

});
