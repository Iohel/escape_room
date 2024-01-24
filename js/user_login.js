function login() {
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    console.log(email.value);
    console.log(password.value);
    if(localStorage.getItem(email.value)){
        let item = JSON.parse(localStorage.getItem(email.value));
        console.log(item);
        console.log(item.password);
        console.log(password.value);
        if(item.password === password.value){
            console.log("login");
            item.login = 1;
            localStorage.setItem(email.value,JSON.stringify(item));
        }else{
            email.value = "";
            password.value = "";
        }
    }else{
        username.value = "";
        password.value = "";
    }

}

let buttonLogin = document.querySelector("#login");
buttonLogin.addEventListener("click",()=>{
    login();
});
