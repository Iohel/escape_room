function register(){
    let email = document.querySelector("#email");
    let username = document.querySelector("#username");
    let password1 = document.querySelector("#password1");
    let password2 = document.querySelector("#password2");

    console.log(email.value);
    console.log(username.value);
    console.log(password1.value);
    console.log(password2.value);

    if(localStorage.getItem(email.value)){
        email.value = "";
        username.value = "";
        password1.value = "";
        password2.value = "";
    }else{
        if (esEmailValid(email)) {
            if(comprovaContrasenyesIguales(password1,password2)){
                localStorage.setItem(email.value,JSON.stringify({username:username.value,password:password1.value,login:0}));
                console.log("register");
            }else{
                email.value = "";
                username.value = "";
                password1.value = "";
                password2.value = "";
            }
        }else{
            email.value = "";
            username.value = "";
            password1.value = "";
            password2.value = "";
        }
        
    }

}

function esEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value.trim())){
        return true;
    }else{
        return false;
    }
}

function comprovaContrasenyesIguales(input1,input2) {
    
    if(input1.value != input2.value){
        return false;
    }else{
        return true;
    }

}

let buttonRegister = document.querySelector("#register");
buttonRegister.addEventListener("click",()=>{
    register();
})


