let imagen = document.querySelector("img");

imagen.addEventListener('click', (e)=>{

    
    
    let objCoordinates = getCoordinates(e);
    
    console.log(objCoordinates.x);
    console.log(objCoordinates.y);
    
})

function getCoordinates(event) {
    return {
        x: event.clientX,
        y: event.clientY
    }  
}