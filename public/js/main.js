console.log('hiiii from main.js');

var url = "mongodb://localhost:27017/covid-microgrants-project";

$(".button-collapse").sideNav();

$(document).ready(function(){
  var url = window.location.pathname;
  $(".navbar-fixed nav div ul li").each(function(){
    if($(this).children().attr("href") == url)
      $(this).addClass("active");
  });
  // $('#modal_595ff3513a43b0ed58d370ce').modal();
  $('.modal').modal();

})

var $requester_name = $('#requester_name'),
    $email = $('#email'),
    $venmo_username = $('#venmo_username'),
    $min_amount = $('#min_amount'),
    $max_amount = $('#max_amount'),
    $indexSubmitButton = $('#index-submit-button'),
    $deleteButton = $('.delete-button');
    $newAnswer = $('#new-answer'),
    $updateAnsButton = $('#new-answer-button'),
    // $cardsSubmitButton = $('#cards-submit-button_595ff3513a43b0ed58d370ce'),
    // $cardsSubmitButton2 = $('#cards-submit-button_595ff4310b78e9edfd8d9d02'),
    allDeleteButtons = document.getElementsByClassName('delete-buttons'),
    allCardsSubmitButtons = document.getElementsByClassName('buttonbears');

  // $('.modal').modal({
  //     dismissible: true, // Modal can be dismissed by clicking outside of the modal
  //     ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
  //       alert("Ready");
  //       console.log(modal, trigger);
  //     },
  //     complete: function() { alert('Closed'); } // Callback for Modal close
  //   }
  // );

function addCard(evt) {
  console.log('in main.js addCard function');
  // error checking for just whitespace
  if (!(/\S/.test($requester_name.val()) && /\S/.test($email.val())
      && /\S/.test($venmo_username.val()) && /\S/.test($min_amount.val())
      && /\S/.test($max_amount.val()))) {
    // string is just whitespace
    window.alert("Please fill in all the fields.");
    return;
  }
  var data = {};
  // data.question = $question.val();
  data.requester_name = $requester_name.val();
  data.email = $email.val();
  data.venmo_username = $venmo_username.val();
  data.min_amount = $min_amount.val();
  data.max_amount = $max_amount.val();
  // data.whatever = $question.val();
  // data.requester_name = $question.val();
  // data.email = $answer.val();
  // data.venmo_username = $wrong1.val();
  // data.min_amount = $wrong2.val();
  // data.max_amount = $wrong3.val();


  var color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);

  /* from user Alnitak at question
    https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black */
  var c = color.substring(1);      // strip #
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = (rgb >> 16) & 0xff;  // extract red
  var g = (rgb >>  8) & 0xff;  // extract green
  var b = (rgb >>  0) & 0xff;  // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  while (luma > 128) {
    console.log('color ' + color + ' was too bright. Trying another color.');
    color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    c = color.substring(1);      // strip #
    rgb = parseInt(c, 16);   // convert rrggbb to decimal
    r = (rgb >> 16) & 0xff;  // extract red
    g = (rgb >>  8) & 0xff;  // extract green
    b = (rgb >>  0) & 0xff;  // extract blue
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  data.cardColor = color;

  $.post('/cards', { value: data});


  $requester_name.val('');
  $requester_name.blur();
  $email.val('');
  $email.blur();
  $venmo_username.val('');
  $venmo_username.blur();
  $min_amount.val('');
  $min_amount.blur();
  $max_amount.val('');
  $max_amount.blur();
}

function deleteCard(evt) {
  console.log('whatsup');
  var id = this.id.slice(22);
  console.log('iddddddd is ' + id);
  var yesId = 'yes_' + id;
  console.log('yesId is', yesId);
  var radio = document.getElementById(yesId);
  if (radio.checked) {
    console.log('yaaaas');
    var remId = '#' + id;
    $.ajax({
      url: '/cards/delete/' + id,
      type: 'delete',
      dataType: 'json',
      data: {value: id},
      success: function(data, response) {
      $(remId).remove();
      }
    });
  }
  else console.log('noooo');
}

/* Need to add user credentials */
function updateCard(evt) {
  console.log('in main.js updateCard function');
  var data = {};
  data.newAns = $newAnswer.val();
  data.cardId = window.location.pathname.substring(7, 31);
  console.log('cardId is ' + data.cardId);
  var classSelect = '.' + data.cardId;

  $.ajax({
     url: '/cards/' + data.cardId,
     type: 'put',
     dataType: 'json',
     data: {value: data},
     success: function(data, response) {
      console.log('data is', data);
      $(classSelect).load(location.href + " " + classSelect + ">*","");
     }
  });

  // $.post('/cards/' + data.cardId, { value: data}, (res) => {
  //   console.log(res);
  //   $(classSelect).load(location.href + " " + classSelect + ">*","");
  // });
  $question.val('');
  $question.blur();
  $answer.val('');
  $answer.blur();
}

// $('.cards-submit-buttons').click(function() {
//     // here you could use "this" to get the DOM element that was clicked.
//     console.log('hullo');
// });

// function checkAns(evt) {
//   console.log('whatsup');
//   var id = this.parentNode.parentNode.id.slice(6);
//   console.log('iddddddd is ' + id);
//   var radios = document.getElementsByName(id);

//   for (var i = 0, length = radios.length; i < length; i++) {
//     if (radios[i].checked) {
//         // var radioId = '#test' + i;
//         // console.log('radioId is ' + radioId);
//         console.log('radio ' + i + '\'s value is ' + radios[i].value);
//         // console.log('radios[i].parentNode.parentNode.parentNode.id is ' + radios[i].parentNode.parentNode.parentNode.id);
//         $.get('/cards/' + id, {value: id}, (res) => {
//           console.log('res is ', res);
//           console.log('res.answer is', res.answer);
//           if (radios[i].value === res.answer) {
//             Materialize.toast('correct answer!');
//           }
//           else Materialize.toast('nahhhhhh');
//         });

//         break; // since only one will be checked
//     }
//   }
// }

$indexSubmitButton.on('click', addCard);
$("#wrong-3").keyup(function(event){
    console.log('something happened');
    if(event.keyCode == 13)
      $("#index-submit-button").click();

});

$deleteButton.on('click', deleteCard);
$updateAnsButton.on('click', updateCard);
$("#new-answer").keyup(function(event) {
  console.log('umm');
  if (event.keyCode == 13) {
    $("#new-answer-button").click();
  }
});
// $cardsSubmitButton.on('click', checkAns);
// $cardsSubmitButton2.on('click', checkAns);
// $('.cards-submit-buttons').on('click', checkAns);

// [].forEach.call(allCardsSubmitButtons, function(element) {
//   element.addEventListener('click', checkAns);
// });

[].forEach.call(allDeleteButtons, function(element) {
  element.addEventListener('click', deleteCard);
});






