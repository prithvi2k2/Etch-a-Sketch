const main = document.querySelector('.container');
let drag = false;
let grid = true;
main.addEventListener('mouseleave',()=>{drag=false});
// default color
let color = document.getElementById('color').value;
const paint = (e) => {
    if(drag)
        e.target.style.background = color;
}

const ntg = ()=>{};

const toggleBoxEvents = add => {
    const boxes = document.querySelectorAll(".innerCont");
    if (add) {
        boxes.forEach(box => {
            box.addEventListener('mousedown',(e)=>{
                drag = true;
                paint(e);
            } );
            
            box.addEventListener('mouseenter',paint);
            
            box.addEventListener('mouseup',()=>{drag=false});
        });
        
    }
    else {
        boxes.forEach(box => {
            box.removeEventListener('mouseenter',ntg);
            box.removeEventListener('mouseup',ntg);
            box.removeEventListener('mousedown',ntg);
            
            drag = false;
        });
    }
};

const Draw = (size) => {
    for (let i = 0; i < size; i++) {
        // rowContainer
        const rowCont = document.createElement('div');
        rowCont.classList.add("rowCont")
        for (let j = 0; j < size; j++) {
            // innerContainer
            let cont = document.createElement('div');
            cont.setAttribute("draggable",false); 
            cont.style.cssText =
                `width:calc(50vh/${size});
                height:calc(50vh/${size})`;
            cont.classList.add("innerCont");
            grid = true;
            rowCont.appendChild(cont);
        }
        main.appendChild(rowCont);
    }
    document.querySelector('.currSize').innerHTML = `Size : ${size} x ${size}`;
    toggleBoxEvents(true);
}
// default size 5x5
const resize = document.getElementById('slider');
size = resize.value;
Draw(size);

// event listeners
const colorPick = document.getElementById('color');
colorPick.addEventListener('input', (e) => {
    color = e.target.value;
})

resize.addEventListener('input', (e) => {
    size = e.target.value;
    toggleBoxEvents(false);
    main.innerHTML = "";
    Draw(size);
})

const Grid = ()=>{
    boxes = document.querySelectorAll('.innerCont');
    
    if(grid){
        boxes.forEach(box=>box.style.border="unset")
        grid = false;
    }
    else{
        boxes.forEach(box=>box.style.border="0.5px solid gray")
        grid = true;
    }
}

const eraseAll = ()=>{
    boxes = document.querySelectorAll('.innerCont');
    boxes.forEach(box => box.style.background = "unset")
}