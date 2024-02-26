const hangmanEnvoltorio = document.getElementsByClassName('hangman-envoltorio-popup');
const memoryEnvoltorio = document.getElementsByClassName('memory-envoltorio-popup');
const cerrar = document.getElementsByClassName('cerrar-popup');

document.querySelector("#Hangman").addEventListener("click",()=>{
    location.href="../html/ahorcado_tutorial.html";
});

document.querySelector("#Hangman_Records").addEventListener("click",()=>{
    hangmanEnvoltorio[0].style.display = 'block';
    recordPopup("Hangman");
});

document.querySelector("#Memory").addEventListener("click",()=>{
    location.href="../html/memory.html";
});

document.querySelector("#Memory_Records").addEventListener("click",()=>{
    memoryEnvoltorio[0].style.display = 'block';
    recordPopup("Memory");
});

cerrar[0].addEventListener('click', () => {
    hangmanEnvoltorio[0].style.display = 'none';
    
});
cerrar[1].addEventListener('click', () => {
    
    memoryEnvoltorio[0].style.display = 'none';
});

function recordPopup(game) {
    let records = JSON.parse(localStorage.getItem(game));
    let table = document.querySelector("tbody");
    let i = 1;
    
    records = records.sort((a,b)=>(b[1]-a[1]));
    table.innerHTML = 
    "<tbody>"+
        "<tr>"+
            "<th>Position</th>"+
            "<th>Username</th>"+
            "<th>Score</th>"+
        "</tr>"+
    "</tbody>"
    records.forEach(record => {
        if(i<21){
            table.innerHTML += 
            "<tr>"+
                "<td>"+i+"</td>"+
                "<td>"+record[0]+"</td>"+
                "<td>"+record[1]+"</td>"+
            "</tr>"
            i++; 
        }
           
    });
    
}