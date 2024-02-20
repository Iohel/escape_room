
function memoryGame() {
    let colors = ["blue","red","purple","green","orange","yellow","silver","pink","brown","aqua"];
    
    let pairs = 21;
    let array = [];
    for (let i = 1; i <= pairs; i++) {
            
        array.push(i);
        array.push(i);
            
    }
    array.sort(()=>{return 0.5 - Math.random();})
    let id = 0;

    let main = document.createElement("main")
    document.querySelector("body").append(main);

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
                        console.log("you win");
                        let code = [];
                        setTimeout(() => {
                            
                            colors.forEach(color => {
                                let win = new Set();
                                
                                if(document.querySelectorAll("."+color).length/2 >= 4){
                                    document.querySelectorAll("."+color).forEach(number =>{
                                        win.add(number.innerText);
                                    })
                                    code.push(win);
                                }

                            });
                            let t = Math.floor(Math.random())*code.length;
                            console.log(code);
                            if(code.length != 1){
                                code = [...code[t]];
                            }else{
                                code = [...code[0]];
                            }

                            for (let i = 0; i < 4; i++) {
                                console.log(code[i]);
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
}

memoryGame();