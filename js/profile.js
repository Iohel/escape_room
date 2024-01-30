let email = document.querySelector("#email");
let usernameInput = document.querySelector("#usernameForm");
let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");
let change = document.querySelector("#change");
setTimeout(()=>{
    email.value = key;
    usernameInput.value = item.username;
    
    change.addEventListener("click",function(){

        if(esEmailValid(email) && comprovaContrasenyesIguales(password1,password2)){
            if(email.value === key){
                item.username = usernameInput.value;
                item.password = password1.value;
                localStorage.setItem(key,JSON.stringify(item));
                location.href = "";
            }else{
                localStorage.removeItem(key);
                item.username = usernameInput.value;
                item.password = password1.value;
                localStorage.setItem(email.value,JSON.stringify(item));
                location.href = "";
            }
        }else{
            location.href = "";
        }

    })
    
},250);

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