$(document).ready(function () {

  $(".new-tweet").on( "keyup keypress", "textarea" , function(event) {
   
    const textarea = event.target;
    const text = textarea.value;
    const charsLeft = 140 - text.length;

    const counter = textarea.closest("form").querySelector(".counter");
    counter.textContent = charsLeft;
    
    if (charsLeft < 0) {
      counter.style.color = "red";
    } else {
      counter.style.color = "";
    }

  });

});