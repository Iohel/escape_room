const envoltorio = document.getElementsByClassName('envoltorio-popup');
const cerrar = document.getElementsByClassName('cerrar-popup');

document.querySelector("#Hangman").addEventListener("click",()=>{
    location.href="../html/ahorcado_tutorial.html";
});

document.querySelector("#Hangman_Records").addEventListener("click",()=>{
    envoltorio[0].style.display = 'block';
    recordPopup("Hangman");
});

cerrar[0].addEventListener('click', () => {
    envoltorio[0].style.display = 'none';
});

function recordPopup(game) {
    let records = JSON.parse(localStorage.getItem(game));
    let table = document.querySelector("tbody");
    let i = 1;
    records = records.sort((a,b)=>(b[1]-a[1]));
    records.forEach(record => {
        table.innerHTML += 
        "<tr>"+
            "<td>"+i+"</td>"+
            "<td>"+record[0]+"</td>"+
            "<td>"+record[1]+"</td>"+
        "</tr>"
        i++;    
    });
    
}