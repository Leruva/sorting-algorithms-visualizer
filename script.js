const navLinks = document.querySelectorAll(".nav-tabs button a");
const navBtns = document.querySelectorAll(".nav-btns button ");
const titleEl = document.getElementById("sort-title");
const timeBestEl = document.getElementById("timeBest");
const timeAvgEl = document.getElementById("timeAvg");
const timeWorstEl = document.getElementById("timeWorst");
const spaceCompEl = document.getElementById("spaceComp");
const stableEl = document.getElementById("stable");
const inPlaceEl = document.getElementById("inPlace");
const speedEl = document.getElementById("aSpeed");
const size1El = document.getElementById("aSize");
const size2El = document.getElementById("array_size");
const compEl = document.getElementById("comp");
const swapEl = document.getElementById("swap");
const iterEl = document.getElementById("iter");
const timeEl = document.getElementById("ntime");
const arraysizeSlider = document.getElementById("arraySize");
const animationSlider = document.getElementById("animation-speed");
const box = document.querySelector(".visual-box");
const start = document.getElementById("start-btn");
const stop = document.getElementById("stop-btn");
const shuffle = document.getElementById("shuffle-btn");


let isSorted = false;
let isSorting = false;
let isPaused = false;
let isStopped = false;
let comparisons = 0;
let swaps = 0;
let iterations = 0;
let startTime = 0;
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
    const time = Math.max(20, 1100 - animationSlider.value * 100);
    return new Promise(resolve => setTimeout(resolve, time));
}

function updateStats(){
    compEl.textContent = comparisons;
    iterEl.textContent = iterations;
    swapEl.textContent = swaps;
}

function resetStats(){
    comparisons = 0;
    iterations = 0;
    swaps = 0;    
    updateStats();
}
let timerId;

function startTimer() {
  cancelAnimationFrame(timerId);
  startTime = Date.now();

  function tick() {
    if (!isSorting) return;
    updateTimer();
    timerId = requestAnimationFrame(tick);
  }
  tick();
}

function stopTimer() {
  cancelAnimationFrame(timerId);
}
function updateTimer(){
    const timeelasped = Date.now() - startTime;
    timeEl.textContent = `${(timeelasped/1000).toFixed(2)}s`
}
navBtns.forEach((link)=>{
    
})
navLinks.forEach((link) => {
    link.addEventListener("click", (e) =>{
        e.preventDefault();
        if(isSorting) return;
        resetStats();
        timeEl.textContent = "0s";
        navLinks.forEach((l)=> l.classList.remove("active"));
        link.classList.add("active");

        const key = link.dataset.sort;
        const data = algorithmData[key];

        titleEl.textContent = data.title;
        timeBestEl.textContent = data.time.best;
        timeAvgEl.textContent = data.time.average;
        timeWorstEl.textContent = data.time.worst;
        spaceCompEl.textContent = data.space.worst;
        stableEl.textContent = data.space.stable;
        inPlaceEl.textContent = data.space.inPlace;
    });
});
animationSlider.addEventListener("input",()=>{
    const speed = parseInt(animationSlider.value);
    speedEl.textContent = speed + ".0 x";
})
arraysizeSlider.addEventListener("input", ()=>{
    if (isSorting) return;
    const newSize = parseInt(arraysizeSlider.value);
    size1El.textContent = newSize;
    size2El.textContent = "Array size: " + newSize;
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
    resetStats();
    startTimer();
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
        case "heap":
            await heapSort(currentArray);
            break;
        default:
            break;
    }
    if (isSorted ) {
        
        start.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
        stop.innerHTML = '<span class="material-symbols-outlined">replay</span>';
    }
    
    console.log(isSorted);
    console.log("current array : ");
    console.log(currentArray);
    console.log("previous array");
    console.log(previousArray);
    
});
shuffle.addEventListener("click",()=>{
    resetStats();
    isStopped = true;
    isSorting = false;
    isPaused = false;
    const newSize = parseInt(arraysizeSlider.value);
    currentArray = generateRandomArray(newSize);
    previousArray = [...currentArray];
    renderArray(currentArray);
    stop.innerHTML = '<span class="material-symbols-outlined">stop_circle</span>';
    
    isSorted = false;
    
});
stop.addEventListener("click", () => {
    if (isSorting) {
        isStopped = true;
        isSorting = false;
        stopTimer();
        console.log("paused");
        start.innerHTML = '<span class="material-symbols-outlined">pause_circle</span>';
    } else if (isSorted) {
        renderArray(previousArray);
        currentArray = [...previousArray];
        isSorted = false;
        stop.innerHTML = '<span class="material-symbols-outlined">stop_circle</span>'; 
    }
});
