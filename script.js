
const navLinks = document.querySelectorAll(".nav-tabs a");
const titleEl = document.getElementById("algoTitle");
const timeEl = document.getElementById("timeComp");
const spaceEl = document.getElementById("spaceComp");
const speedEl = document.getElementById("speed-lbl");
const arraysizeSlider = document.getElementById("arraySize");
const animationSlider = document.getElementById("speed");
const box = document.querySelector(".visual-box");
const start = document.getElementById("start_btn");
const stop = document.getElementById("stop_btn");
const shuffle = document.getElementById("shuffle_btn");

let isSorted = false;
let isSorting = false;
let isPaused = false;
let isStopped = false;

let previousArray = []
let currentArray = [];
const size = arraysizeSlider.value;
currentArray = generateRandomArray(size);
previousArray = [...currentArray];
renderArray(currentArray);

function generateRandomArray(size){
    const arr = [];
    for(let i = 0; i < size; i++){
        arr.push(Math.floor(Math.random() * 300) + 10);
    }
    return arr;
};

function renderArray(arr){
    box.innerHTML = "";
    arr.forEach (value =>{
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value +"px";
        box.appendChild(bar);
    })
}
function sleep() {
    const time = 1100 - (animationSlider.value *100);
    return new Promise(resolve => setTimeout(resolve, time));
}


navLinks.forEach((link) => {
    link.addEventListener("click", (e) =>{
        e.preventDefault();

        navLinks.forEach((l)=> l.classList.remove("active"));
        link.classList.add("active");

        const key = link.dataset.sort;
        const data = algoData[key];

        titleEl.textContent = data.title;
        timeEl.textContent = data.time;
        spaceEl.textContent = data.space;
    });
});
animationSlider.addEventListener("input",()=>{
    const speed = parseInt(animationSlider.value);
    speedEl.textContent = speed + ".0 x";
})
arraysizeSlider.addEventListener("input", ()=>{
    if (isSorting) return;
    const newSize = parseInt(arraysizeSlider.value);
    currentArray = generateRandomArray(newSize);   
    renderArray(currentArray);
    previousArray = [...currentArray];
    isSorted = false;
    isStopped = false;
});

start.addEventListener("click",async () =>{
    const activeLink = document.querySelector(".nav-tabs a.active");
    if(isSorting) return;
    console.log(previousArray); 
    if(!activeLink) return;
    isSorted = false;
    isStopped = false;
    
    
    console.log(isSorted);
    // if(i == 0) previousArray = [...currentArray];
    const key = activeLink.dataset.sort;
    switch(key){
        case "insertion":
            await insertionSort(currentArray);
            break;
        case "selection":
            await selectionSort(currentArray);
            break;
        case "quick":
            await quickSort(currentArray);
            break;
        case "merge":
            await mergeSort(currentArray);
            break;
        case "bubble":
            await bubbleSort(currentArray);
            break;
        default:
            break;
    }
    if (isSorted ) {
        stop.textContent = "↺";   // change Stop → Reset
    }
    console.log(isSorted);
    console.log("current array : ");
    console.log(currentArray);
    console.log("previous array");
    console.log(previousArray);
    
});
shuffle.addEventListener("click",()=>{
    isStopped = true;
    isSorting = false;
    isPaused = false;
    const newSize = parseInt(arraysizeSlider.value);
    currentArray = generateRandomArray(newSize);
    previousArray = [...currentArray];
    renderArray(currentArray);
    stop.textContent = "■"; 
    isSorted = false;
    
});
stop.addEventListener("click", ()=>{
    if(isSorted) {
        stop.textContent = "■";
        renderArray(previousArray);
        currentArray = previousArray;
        isSorted = false;
        return;
    }
    //previousArray = currentArray;
    isSorting = false;
    isStopped = true;
   
});

