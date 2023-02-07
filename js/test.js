'use strict';
console.log('The test file is working');


let productContainer = document.querySelector('section');
let resultButton = document.querySelector('section+div');
let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(3)');
let img3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicksAllowed = 25;

let state = {
  allProductArray: [],
}

function Product(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

let banana = new Product('banana','../img/banana.jpg');
