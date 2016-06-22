$(document).ready(function() {

  var tamagotchiOne = { food: 100 }

  var counter = setInterval(timer, 500);

  function timer()
  {
    tamagotchiOne.food = tamagotchiOne.food - 1;

    $('#food').css('width', tamagotchiOne.food + "%");
  }

});
