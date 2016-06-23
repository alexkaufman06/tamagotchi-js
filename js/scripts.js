$(document).ready(function() {

  var player = { pennies: 0, dimes: 0, dollars: 0 };

  var tamagotchiOne = { food: 100 };

  var counter = setInterval(timer, 250);

  function timer()
  {
    player.pennies += 1;

    tamagotchiOne.food = tamagotchiOne.food - .5;

    if (player.pennies === 10) {
      player.dimes += 1;
      player.pennies -=10;
      $('.dimes').empty();
      $('.dimes').append(player.dimes);
    }

    if (player.dimes === 10) {
      player.dollars += 1;
      player.dimes -=10;
      $('.dollars').empty();
      $('.dollars').append(player.dollars);
    }

    $('#food').css('width', tamagotchiOne.food + "%");
    $('.pennies').empty();
    $('.pennies').append(player.pennies);
  }

});
