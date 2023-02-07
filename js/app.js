'use strict';
console.log('Hello');


let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section+div');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicksAllowed = 25;

//state object holds the current state of the products
const state = {
  allProductArray:[],
};


function Product(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.allProductArray.length);
}

function renderProductImage() {
  let product1 = getRandomNumber();
  let product2 = getRandomNumber();
  let product3 = getRandomNumber();

while (product1 === product2 || product1 === product3 || product2 === product3) {
  product2 = getRandomNumber();
  product3 = getRandomNumber();
} //close while loop

img1.src = state.allProductArray[product1].src;
img2.src = state.allProductArray[product2].src;
img3.src = state.allProductArray[product3].src;
img1.alt = state.allProductArray[product1].name;
img2.alt = state.allProductArray[product2].name;
img3.alt = state.allProductArray[product3].name;
state.allProductArray[product1].views++;
state.allProductArray[product2].views++;
state.allProductArray[product3].views++
};

function handleClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = event.target.alt;
  for (let i=0; i<state.allProductArray.length; i++) {
    if (clickProduct === state.allProductArray[i].name) {
      state.allProductArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    productContainer.removeEventListener('click', handleClick);
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicksAllowed';
    productContainer.className = 'noVoting';
  }
  else {
        renderProductImage();
  }
};

function renderResults() {
  let ul=document.querySelector('ul');
  for (let i=0; i< state.allProductArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${state.allProductArray[i].name} was seen ${state.allProductArray[i].views} times and had ${state.allProductArray[i].clicks} votes.`;
      ul.appendChild(li);
    }
  };

let images = [
  'img/bag.jpg',
  'img/banana.jpg',
  'img/bathroom.jpg',
  'img/boots.jpg',
  'img/breakfast.jpg',
  'img/bubblegum.jpg',
  'img/chair.jpg',
  'img/cthulhu.jpg',
  'img/dog-duck.jpg',
  'img/dragon.jpg',
  'img/pen.jpg',
  'img/pet-sweep.jpg',
  'img/scissors.jpg',
  'img/shark.jpg',
  'img/tauntaun.jpg',
  'img/unicorn.jpg',
  'img/water-can.jpg',
  'img/wine-glass.jpg'
]

function make_products(){
  for (let path of images){
    let name = path.replace('img/','').replace('.jpg','')
    let product = new Product(name,path);
    state.allProductArray.push(product);
  }
}

/*
let bag = new Product('bag','../img/bag.jpg');
let banana = new Product('banana','../img/banana.jpg'); 
let bathroom = new Product('bathroom','../img/bathroom.jpg');
let boots = new Product('boots','../img/boots.jpg');
let breakfast = new Product('breakfast','../img/breakfast.jpg');
*/

make_products();

renderProductImage();
productContainer.addEventListener('click',handleClick)
