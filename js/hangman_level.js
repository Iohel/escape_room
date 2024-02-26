//Capturar los elementos del dom
const contenidor = document.querySelector('.contenidor');
const contador = document.getElementById('contador');
const error = document.getElementById('errors');
const total = document.getElementById('total');
const retry = document.getElementById('retry');
const time = document.getElementById('time');
const status = document.getElementById('status');
const palabra = document.getElementById('palabra');
const showParaula = document.querySelector('.paraula');

//

let paraula;
let paraulaAmagada = "";
let errors = 0;
let score = 0;
let arrayTheme;
let theme;
let jump = 0;
errors = 0;
contador.innerText = '7';

    
//Cronometro
let elCrono;
let elCountdown;
let mifecha = new Date;
let laHora = document.getElementById("time");
let laHora2 = document.getElementById("time2");
let countdown_seconds = new Date;
let countdown = document.querySelector("countdown");



function prepararParaula(e) {
    getThemeData(e);
    setTimeout(()=>{
        
        random = Math.random()*(arrayTheme.length-1);
        paraula = arrayTheme[random.toFixed()].word.toUpperCase(); 
        /* console.log(paraula); */
        
        
        showParaula.innerText = "";
        for (let i = 0; i < paraula.length; i++) {
            console.log(paraula.charAt(i));
            
            showParaula.innerText += '-' ;   
            
        }
        paraulaAmagada = showParaula.innerText;
        console.log(paraulaAmagada);
    },200);
}

//inicializa el tiempo del cronometro
mifecha.setHours(0,0,0,0);
countdown_seconds.setHours(0,0,20,0);

//inicializa el texto de laHora


//Main interval
function cooldown() {
    let segundos = countdown_seconds.getSeconds();
    segundos -= 1;
    countdown_seconds.setSeconds(segundos);
    countdown.innerHTML = ""+segundos;
    if(segundos<0){
        errors++;
        contador.innerText = (7-errors);
       
        reiniciarCooldown();
    }
    if(errors === 7){
        endGame('You lost.',errors);
        stopCooldown();
    }
    return segundos;
}
function reiniciarCooldown(){
    countdown_seconds.setHours(0,0,10,0);
    countdown.innerHTML = "10"
}
function startCooldown(){
    elCountdown = setInterval(cooldown, 1000);
}
function stopCooldown(){
    clearInterval(elCountdown);
}
function crono(){
    
    let horas = mifecha.getHours();
    let minutos = mifecha.getMinutes();
    let segundos = mifecha.getSeconds();

    if(minutos === 0 && segundos === 0){
        endGame("Thank you for playing.");
    }else{
        if(segundos == 0){
            segundos = 59;
            minutos -= 1;
            
            mifecha.setMinutes(minutos);
        }else{
            segundos -= 1;
        }
        
        mifecha.setSeconds(segundos);
    
        if (horas < 10) {horas = "0" + horas;}
        if (minutos < 10) {minutos = "0" + minutos;}
        if (segundos < 10) {segundos = "0" + segundos;}
    
        laHora.innerHTML = horas + ":" + minutos + ":" + segundos;
    }

    

    
}
function reiniciarCrono(){
    mifecha.setHours(0,0,10,0);

//inicializa el texto de laHora
    laHora.innerHTML = "00:03:00";
}
function start(){
    mifecha.setHours(0,3,0,0);
    laHora.innerHTML = "00:03:00";
    elCrono = setInterval(crono, 1000);
}
function stop(){
    clearInterval(elCrono);
}
function reset(){
    setTimeout(reiniciarCrono,0)
}

//Using split [...] we creat an iterable array to change the characters
//then using char at we find if the character is in the word if it is we swap it.
function adivinarLletra(e) {
    let counter = 0;
    charArray = [...paraulaAmagada];
    console.log(paraulaAmagada);
    for (let i = 0; i < charArray.length; i++) {
        if (paraula.charAt(i) === e) {
            charArray[i] = e;
            console.log(charArray);
            counter++;
        }
    }
    //once finished we update paraula amagada with the new string and update it to the player.    
    paraulaAmagada = charArray.join("");
    showParaula.innerText = paraulaAmagada;
    return counter;
}
function endGame(final){
    stop();
    
    score = score;
    
    document.getElementById('status').innerText = final;
    document.getElementById('palabra').innerText = "Final score: " + score;
    const envoltorio = document.getElementsByClassName('envoltorio-popup');
    laHora2.innerText = laHora.innerText;
    contenidor.style.display = 'none';
    envoltorio[0].style.display = 'block';

    //Local Storage Saving
    let finalScore;
    let record = localStorage.getItem("Hangman");
    record = JSON.parse(record);
    
    if(record != null){
        
        record.push([item.username,score]);
        localStorage.setItem("Hangman",JSON.stringify(record));
    }else{
        finalScore = [[item.username,score]];
        localStorage.setItem("Hangman",JSON.stringify(finalScore));
    }
    
}
function startGame(e){
    contador.innerText = (7-errors);
    prepararParaula(e);
    if(score === 0){
        contenidor.addEventListener('click', function game(e){
            if(jump === 0){
                start()
                startCooldown();
                jump++;  
            }
            if (e.target.classList.contains('lletra')) {
                if(paraulaAmagada != paraula && errors != 7) {              
                    if(adivinarLletra(e.target.innerText)>0){
                        e.target.classList.add('correct');
                        
                        reiniciarCooldown();
                    }
                    else{
                        e.target.classList.add('error');
                        errors++;
                        contador.innerText = (7-errors);
                        
                        reiniciarCooldown();
                    }
                    
                }
            }
            if(paraulaAmagada === paraula){
                /* endGame("You win" , errors);
                stopCooldown();     */
                let lletres = document.querySelectorAll(".lletra");
                console.log(lletres);
                lletres.forEach(e => {
                    e.classList.remove("correct");
                    e.classList.remove("error");
                });
                errors = errors-paraula.length;
                contador.innerText = (7-errors);
                score = score+paraula.length*100;
                startGame(theme);
    
            }else if(errors === 7){
                endGame('Thanks for playing.');
                stopCooldown();
            }
        });
    } 
}



const obtenerTODOS = (allblack,source)=>{

    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange',()=>{
        if(request.readyState === 4 && request.status === 200){
            //console.log(request);
            //console.log(request.responseText);
            const respuesta = JSON.parse(request.responseText);
            allblack(undefined, respuesta);
        
        }else if (request.readyState === 4) {
            //console.log("No se ha podido obtener los datos.");
            allblack("No se ha podido obtener los datos.",undefined);
        }
    });
    
    //open
    //P1: tipo de solicitud
    //P2: a que endpoint se solicita
    //https://jsonplaceholder.typicode.com/todos
    request.open('GET', source);
    
    //send
    request.send();
    

};
function gestionarRespuesta(error,data){
    if(error){
        console.log(error);
    }else{
        
        arrayTheme = [...data[0]];
        console.log(arrayTheme);
    }
}

function getThemeData(key) {
    
    switch (key) {
        case "English Words":
            
            obtenerTODOS((error,data)=>{
    
                console.log("tutorial");
                
                gestionarRespuesta(error,data);
                
            },"./themes/english_words.json");
            
            break;
        case "Spanish Words":
            
            obtenerTODOS((error,data)=>{
    
                console.log("tutorial");
                
                gestionarRespuesta(error,data);
                
            },"./themes/spanish_words.json");
            
            break;
        case "City Names":
            
            obtenerTODOS((error,data)=>{
    
                console.log("tutorial");
                
                gestionarRespuesta(error,data);
                
            },"../js/city_names.json");
            
            break;
        case "Pokemon Names":
            
            obtenerTODOS((error,data)=>{
    
                console.log("tutorial");
                
                gestionarRespuesta(error,data);
                
            },"./themes/pokemon_names.json");
            
            break;
    
        default:
            break;
    }
    
}






