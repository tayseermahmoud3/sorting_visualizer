let array = [];
let originalArray = [];
let isPaused = false;

function generateArray() {
  array = [];
  for (let i = 0; i < 10; i++) {
    array.push(Math.floor(Math.random() * 90) + 10);
  }
  originalArray = [...array];
  displayArray();
}

function displayArray(highlight = []) {
  let container = document.getElementById("bars-container");
  container.innerHTML = "";
  array.forEach((value, index) => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";
    bar.innerText = value;
    if (highlight.includes(index)) {
      bar.style.backgroundColor = "tomato";
    }
    container.appendChild(bar);
  });
}

async function startSort() {
  let sortType = document.getElementById("sortType").value;
  if (sortType === "bubble") await bubbleSort();
  else if (sortType === "selection") await selectionSort();
  else if (sortType === "insertion") await insertionSort();
  displaySorted();
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      displayArray([j, j + 1]);
      await delay();
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
}

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      displayArray([minIndex, j]);
      await delay();
      if (array[j] < array[minIndex]) minIndex = j;
    }
    if (minIndex !== i) [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }
}

async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      displayArray([j, j + 1]);
      await delay();
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }
}

function displaySorted() {
  let container = document.getElementById("bars-container");
  container.innerHTML = "";
  array.forEach(value => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";
    bar.innerText = value;
    bar.style.backgroundColor = "#4CAF50";
    container.appendChild(bar);
  });
}

function resetArray() {
  array = [...originalArray];
  displayArray();
}

function delay() {
  return new Promise(resolve => {
    let check = () => {
      if (!isPaused) {
        setTimeout(resolve, 600);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

function pauseSort() {
  isPaused = true;
}

function resumeSort() {
  isPaused = false;
}

generateArray();
