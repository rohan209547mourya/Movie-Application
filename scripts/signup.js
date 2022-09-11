// Sign Up Page Script

let userData = JSON.parse(localStorage.getItem("data")) || [];

let signUp = document.getElementById("signUpForm");
signUp.addEventListener("submit" , checkInfo);

function checkInfo(event){
    event.preventDefault();
    console.log("inside Function");
    let name = signUp.name.value;
    let phone = signUp.phone.value;
    let email = signUp.email.value;
    let password = signUp.password.value;
    let cfPassword = signUp.cfPassword.value;
    
    if(checkEmail(userData , email , phone)){
        alert("Email/Phone Already Exists! Try to Sign In.");
    }
    else{
        if(password != cfPassword){
            alert("Wrong Password!");
        }else{
            let user = new uData(name , phone , email , password);
            userData.push(user);
            localStorage.setItem("data" , JSON.stringify(userData));
        }
    }
}


function checkEmail(array , email , mobile){
    let i = 0;
    while(i < array.length){
        if(array[i].userMobile == mobile || array[i].userEmail == email ){
            return true;
        }
        i++;
    }
}


// Blue Print
function uData(name , contectNo , email , password){
    this.userName = name;
    this.userMobile = contectNo;
    this.userEmail = email;
    this.userPassword = password;
}