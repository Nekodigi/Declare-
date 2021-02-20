get();
function get(){
var xhr = new XMLHttpRequest();
  xhr.open('GET', '/server.php', true);
  xhr.onload = function(e){
    if(this.status == 200){
      var result = this.response;
      $("#declare-items").html(result);
      setupTime();
    }
  }
  xhr.send(null);
}
//Important to find updated HTML! 
$(document).ready(function(){
  setupTime();
});//observe dom update JQuery selector after ajax