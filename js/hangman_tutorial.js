const showParaula = document.querySelector('.paraula');
const contenidor = document.querySelector('.contenidor');
let arrayTheme;
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
    },500);
}
function endGame(){
    location.href="./ahorcado.html";;
}
function gestionarRespuesta(error,data){
    if(error){
        console.log(error);
    }else{
        
        arrayTheme = [...data[0]];
        console.log(arrayTheme);
    }
}
function startGame(e){
            
    prepararParaula(e);
            
    contenidor.addEventListener('click', function game(e){
        if (e.target.classList.contains('lletra')) {
            if(paraulaAmagada != paraula) {              
                if(adivinarLletra(e.target.innerText)>0){
                    e.target.classList.add('correct');
                }
                else{
                    e.target.classList.add('error');
                }
                        
            }
        }
        if(paraulaAmagada === paraula){
                        
            let lletres = document.querySelectorAll(".lletra");
            console.log(lletres);
            lletres.forEach(e => {
                e.classList.remove("correct");
                e.classList.remove("error");
            });
            endGame();
            
        }
    });
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
theme = "City Names"; 
startGame(theme);

