let check=false;
window.swal = swal;
function OpenInformationBoard(){
    if(check==false){
        document.getElementsByClassName('corona-information-btn')[0].style.transform = "rotate(180deg)";
        document.getElementsByClassName('corona-virus-information')[0].style.transform = "translateX(0)";
        check=true;
    }
    else{
        document.getElementsByClassName('corona-information-btn')[0].style.transform = "rotate(0)";
        document.getElementsByClassName('corona-virus-information')[0].style.transform = "translateX(95%)";
        check=false;

    }
}
