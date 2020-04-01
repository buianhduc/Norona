function openNav() {
    document.getElementById("category-options").style.display = "block";
    document.getElementById("category-options").style.width = "fit-content";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("category-options").style.width = "0";
    document.getElementById("category-options").style.display = "none";

  }

  document.getElementById("category-button").addEventListener("click", function(){
    var dis = document.getElementById("category-options").style.display;
    var status;
    if (dis=="none") status=false;
    else status=true;
    if (status==false){
        openNav();
    }
    else{
        closeNav();
    }
  })
document.getElementsByClassName("Description").addEventListener("mouseover", function(){
  
}
)