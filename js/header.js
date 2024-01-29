let username = document.querySelector("#username");
let home = document.querySelector("#home");
let logout = document.querySelector("#logout");
let key = "";
let item = "";
window.onload = function(){
    for (let i = 0; i < localStorage.length; i++) {
        
        console.log(key);
        if(item.login !== 1){
            key = localStorage.key(i);
            console.log(item);
            item = JSON.parse(localStorage.getItem(key));
            
        }
    }
    
    if(item.login !== 1){
        location.href = "/index.html";
    }else{
        
        username.innerText = item.username;
        username.addEventListener("click",()=>{
            location.href = "/html/profile.html";
        })
        home.addEventListener("click",()=>{
            location.href = "/html/menu.html";
        })
        logout.addEventListener("click",()=>{
            item.login = 0;
            localStorage.removeItem(key);
            localStorage.setItem(key,JSON.stringify(item));
            location.href = "";
        })
    }
    
}

