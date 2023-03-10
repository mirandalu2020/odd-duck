'use strict';
console.log('Hello');


let productContainer = document.querySelector('#productContainer');
let resultButton = document.querySelector('button');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');
let img4 = document.querySelector('section img:nth-child(4)');

let randomNumberArr = [];
let clicks = 0;
let maxClicksAllowed = 10;


//productArray object holds the current productArray of the products
let productArray = {
  allProductArray:[],
  productNameArray:[],
  productClicksArray:[],
  productViewsArray:[],
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
  'img/wine-glass.jpg',
  'img/sweep.png',
]

function getRandomNumber() {
  return Math.floor(Math.random() * productArray.allProductArray.length);
}

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function make_products() {
  for (let path of images){
    let name = path.substring(4, path.length - 4)
    //let name = path.replace('img/','').replace('.jpg','')
    let product = new Product(name,path);
    productArray.allProductArray.push(product);
    productArray.productNameArray.push(product.name);
  }
}

function renderProductImage() {
  while (randomNumberArr.length < 8) {
    let randomNumber = getRandomNumber();
    if (!randomNumberArr.includes(randomNumber)){
      randomNumberArr.push(randomNumber);
    }
  }
  //console.log(randomNumberArr);

  let product1 = randomNumberArr.shift();
  let product2 = randomNumberArr.shift();
  let product3 = randomNumberArr.shift();
  let product4 = randomNumberArr.shift();
  //console.log(randomNumberArr);

img1.src = productArray.allProductArray[product1].src;
img2.src = productArray.allProductArray[product2].src;
img3.src = productArray.allProductArray[product3].src;
img4.src = productArray.allProductArray[product4].src;
img1.alt = productArray.allProductArray[product1].name;
img2.alt = productArray.allProductArray[product2].name;
img3.alt = productArray.allProductArray[product3].name;
img4.alt = productArray.allProductArray[product4].name;
productArray.allProductArray[product1].views++;
productArray.allProductArray[product2].views++;
productArray.allProductArray[product3].views++;
productArray.allProductArray[product4].views++;
};

function handleClick(event) {
  if (event.target === productContainer) {
    alert('Please click on an image');
  }
  clicks++;

  let clickProduct = event.target.alt;
  for (let i=0; i<productArray.allProductArray.length; i++) {
    if (clickProduct === productArray.allProductArray[i].name) {
      productArray.allProductArray[i].clicks++;
      break;
    }
  }

  if (clicks === maxClicksAllowed) {
    let images = document.querySelector('img');
    let graphContainer = document.querySelector('#chart')
    productContainer.removeEventListener('click', handleClick);
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicksAllowed';
    graphContainer.className = 'clicksAllowed';
    productContainer.className = 'noVoting';
    images.className = 'noVoting';
    resultButton.removeAttribute('disabled');
    let storeProducts = localStorage.setItem(
      'products', JSON.stringify(productArray));
      renderChart()
  }
  
  else {
        renderProductImage();
  }
};

function renderResults() {
  let ul=document.querySelector('section ul');
  for (let i=0; i< productArray.allProductArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${productArray.allProductArray[i].name} was seen ${productArray.allProductArray[i].views} times and had ${productArray.allProductArray[i].clicks} votes.`;
      ul.appendChild(li);
    }
  };

function pageLoad() {
  let getStoredProducts = localStorage.getItem('products');
  if (getStoredProducts) {
    console.log('Local storage');
    let parsedProduct = JSON.parse(getStoredProducts); //the stored data
    productArray = parsedProduct;
    console.log(productArray.allProductArray)
  }

  else {
    make_products();
  }
}


pageLoad();
renderProductImage();
productContainer.addEventListener('click',handleClick);

function renderChart() {
  for (let i=0; i< productArray.allProductArray.length; i++) {
    let productView = productArray.allProductArray[i].views; 
    productArray.productViewsArray.push(productView)
  };
    console.log(productArray.productViewsArray);

  let productClicksArray = [];  
  for (let i=0; i< productArray.allProductArray.length; i++) {
    let productClick = productArray.allProductArray[i].clicks; 
    productClicksArray.push(productClick);
  };

  let clickToView = [];
  for (let ii in productClicksArray) {
    let ratio = productClicksArray[ii] / productArray.productViewsArray[ii] *100
    clickToView.push(ratio)
  }

  const ctx = document.getElementById('myChart');

  const mixedChart = new Chart(ctx, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Number of Clicks',
            data: productArray.productViewsArray,
            borderColor: '#36A2EB',
        }, {
            type: 'line',
            label: 'Number of Views',
            data: productClicksArray,
            borderColor:'#FFBF0075',
        },{
          type: 'bar',
          label: 'Click to View Ratio (%)',
          data: clickToView,
          borderColor:'#FFBF00',
          backgroundColor: '#02285175'
      }],
        labels: productArray.productNameArray,
        
    },
});
}
