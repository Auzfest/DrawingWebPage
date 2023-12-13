//create variables
const canvas = document.getElementById("drawingBoard");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

// Function to save the drawing as an image
const saveDrawing = () => {
    const image = new Image();
    image.src = canvas.toDataURL(); // Convert canvas content to data URL

    // Create a temporary link and trigger a download
    const link = document.createElement('a');
    link.href = image.src;
    link.download = 'drawing.png';
    link.click();
}

//tool bar listeners
toolbar.addEventListener('click', e =>{
    if(e.target.id === 'clear')//clear button
    {
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    if(e.target.id === 'save')//save button
    {
        saveDrawing();
    }
});

toolbar.addEventListener('change', e =>{
    if(e.target.id === 'stroke')
    {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth')
    {
        lineWidth = e.target.value;
    }
});

//draw function
const draw = (e) => {
    if(!isPainting)
    {
        return;
    }
    //set width of 'pencil'
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    //create the stroke
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY)
    ctx.stroke();
}

//drawing listeners
canvas.addEventListener('mousedown', (e) => {
    isPainting = true; //is drawing
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false; // is not drawing
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
