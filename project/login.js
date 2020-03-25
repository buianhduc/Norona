const showBtn = document.querySelector(".show");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("wrapper").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    //var user = firebase.auth().currentUser;
    //if (user != null){
      //var email_id = user.mail;
    //}  (Dòng này để lưu thông tin nhé)

  } else {
    document.getElementById("wrapper").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

  

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    window.alert("Lỗi: " + errorMessage);

  });
  

}

function logout(){

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

}