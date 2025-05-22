<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>


$(document).ready(function(){
  $("#language").hide();
  $("#home").hide();
  
  $(".standby").click(function(){
    $("#sb").hide();
    $("#language").show();
  });

  $(".sb-prompt").click(function(){
    $("#language").hide();
    $("#home").show();
  });
});

function addPassenger() {
  let passengerInput = document.getElementById("passengerInput");
  let currentValue = parseInt(passengerInput.value) || 0;
  let newValue = currentValue + 1;
  passengerInput.value = newValue;
}

function setupDateButtons() {
  document.querySelectorAll('.c1-date').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.c1-date').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', setupDateButtons);



/* // page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  }); */


  /*  */