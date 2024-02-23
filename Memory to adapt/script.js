
function memoryGame() {
    let colors = ["blue","red","purple","green","orange","yellow","silver","pink","brown","aqua"];
    let finalColor = [];
    let pairs = 21;
    let array = [];
    for (let i = 1; i <= pairs; i++) {
            
        array.push(i);
        array.push(i);
            
    }
    array.sort(()=>{return 0.5 - Math.random();})
    let id = 0;

    

    array.forEach(element => {
        let div = document.createElement("div",{"id":id, "class":"hidden"});
        div.append(element)
        document.querySelector("main").append(div);
        id++;
    });

    let value1 = -1;
    let value2 = -1;
    let cleared = 0;
    document.querySelectorAll("div").forEach(element => {
        element.addEventListener("click",function(e){
            
            if(value1 !== -1){
                value2 = e.target.innerText;
                if(value1 == value2){
                    
                    e.target.className = "revealed";
                    let random = Math.ceil((Math.random())*colors.length);
                    console.log(random-1);
                    let color = colors[random-1];
                    
                    setTimeout(()=>{
                        document.querySelectorAll(".revealed").forEach(element => {
                            element.setAttribute('class','cleared '+color);
                        });
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
                            document.querySelector(".envoltorio-popup").classList.add(finalColor);

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
                    },1000);
                    
                    value1 = -1;
                    value2 = -1;
    
                }
            }else{
                value1 = e.target.innerText;
                e.target.className = "revealed";
                
            }
        })
    });
    document.querySelectorAll(".input").forEach(element => {
        
        element.addEventListener("change",function(){
            /* console.log(this.value); */
        });
    });
    document.querySelector("button").addEventListener("click",function(){
        let correct = true;
        document.querySelectorAll(".input").forEach(element => {
            if(element.id !== element.value){
                correct = false;
            }else{
                console.log(":D");
            }
        });

        if(correct){
            document.querySelector(".contenido-popup").innerHTML="test";
        }
    })
}

memoryGame();