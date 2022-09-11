let userData = JSON.parse(localStorage.getItem("data")) || [];


let form = document.getElementById("logInForm");
form.addEventListener("submit" , checkLogIn);


function checkLogIn(event){
    event.preventDefault();

    let email = form.email.value;
    let password = form.password.value;
    checkInfo(email , password);
}


function checkInfo(email , password){
    userData.forEach(function(el){
        if(email == el.userEmail){
            if(password == el.userPassword){
                alert("Log In SuccessFul");
                window.location.href = "./index.html";
            }else{
                alert("Wrong Password");
            }
        }else{
            alert("Email Not Found");
        }
    })
}