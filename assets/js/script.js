<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>


$(document).ready(function(){
    $("#language").hide();
    $("#home").hide();
    
    $("button").click(function(){
      $("#sb").hide();
      $("#language").show();
    });
  });