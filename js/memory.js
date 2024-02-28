let seconds = 0;
    let colors = ["blue","red","purple","green","orange","yellow","silver","pink","brown","aqua"];
    let score = 99999;
    let clues = 0;
    let finalColor = [];
    let crono = null;
    let pairs = 32;
    let array = [];
function memoryGame() {
    
    for (let i = 1; i <= pairs; i++) {
            
        array.push(i);
        array.push(i);
            
    }
    array.sort(()=>{return 0.5 - Math.random();})
    let id = 0;

    

    array.forEach(element => {
        let div = document.createElement("div",{"id":id});
        div.append(element)
        div.classList.add("hidden");
        document.querySelector("main").append(div);
        id++;
    });

    let value1 = -1;
    let value2 = -1;
    let block = false;
    let cleared = 0;
    document.querySelectorAll("div").forEach(element => {
        element.addEventListener("click",function(e){
            if(seconds === 0){
                crono  = setInterval(counter,1000);
            }
            if(!block){
                if(value1 !== -1){
                    value2 = e.target.innerText;
                    block = true;
                    if(value1 == value2){
                        
                        e.target.className = "revealed";
                        let random = Math.ceil((Math.random())*colors.length);
                        console.log(random-1);
                        let color = colors[random-1];
                       
                        setTimeout(()=>{
                            document.querySelectorAll(".revealed").forEach(element => {
                                element.setAttribute('class','cleared '+color);
                            });
                            block = false;
                        },500)
                        
                        value1 = -1;
                        value2 = -1;
                        cleared++;
    
                        if (pairs==cleared) {
                            
                            let code = [];
                            setTimeout(() => {
                                
                                colors.forEach(color => {
                                    let win = new Set();
                                    let colors = new Set();
                                    if(document.querySelectorAll("."+color).length/2 >= 4){
                                        document.querySelectorAll("."+color).forEach(number =>{
                                            win.add(number.innerText);
                                            
                                        })
                                        code.push(win);
                                        colors.add(color);
                                    }
    
                                });
                                let t = Math.floor(Math.random())*code.length;
                                console.log(code);
                                if(code.length != 1){
                                    code = [...code[t]];
                                    finalColor = colors[t];
                                }else{
                                    code = [...code[0]];
                                    finalColor = colors[0];
                                }
                                document.querySelector(".contenidor").style.display = 'none';
                                document.querySelector(".envoltorio-popup").style.display = 'block';
                                document.querySelector(".popup").classList.add(finalColor);
    
                                for (let i = 0; i < 4; i++) {
                                    console.log(code[i]);
                                    let inputs = document.querySelectorAll(".input");
                                    inputs[i].id = code[i];
                                }
                                
                                
                            }, 3000);
                        }
                    }else{
                        e.target.className = "revealed";
                        
                        setTimeout(()=>{
                            document.querySelectorAll(".revealed").forEach(element => {
                                element.removeAttribute('class')
                            });
                            block = false;
                        },1000);
                        
                        value1 = -1;
                        value2 = -1;
        
                    }
                }else{
                    value1 = e.target.innerText;
                    e.target.className = "revealed";
                    
                }
            }
            
        })
    });

    function counter(){
        seconds += 1;
    }
}

memoryGame();

document.querySelector(".solve").addEventListener("click",function(){
    let correct = true;
    document.querySelectorAll(".input").forEach(element => {
        if(element.id !== element.value){
            correct = false;
        }else{
            console.log(":D");
        }
    });

    if(correct){
        clearInterval(crono);
        score = score-(seconds*100)-(clues*10000);
        document.querySelector(".contenido-popup").innerHTML=
        "<section>"+
            "<h1>Final Score</h1>"+
            "<h6>"+score+"</h6>"+
            "<a href='./menu.html'>To the menu.</a>"
        "</section>";
        let record = localStorage.getItem("Memory");
        record = JSON.parse(record);

        if(record != null){
            
            record.push([item.username,score]);
            localStorage.setItem("Memory",JSON.stringify(record));
        }else{
            finalScore = [[item.username,score]];
            localStorage.setItem("Memory",JSON.stringify(finalScore));
        }
    }
})

document.querySelector(".clue").addEventListener("click",function (){
    let output = document.querySelector(".clue_output");
    clues++;
    
    if (clues === 1) {
        output.innerHTML = output.innerHTML + "<p>Think of the colors.</p>";
    }else if (clues === 2) {
        output.innerHTML = output.innerHTML + "<p>The order matters.</p>";
    }else if (clues === 3){
        output.innerHTML = output.innerHTML + "<p>The first 4 numbers.</p>";                
    }else{
        clues = 3;
    }
    
})