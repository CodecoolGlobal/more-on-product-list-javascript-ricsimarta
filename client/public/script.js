import { products } from '/data.js';


const divElement = function (content){
  return `<div>${content}</div>`;
}

const loadEvent = function() {
  console.log(products[0]);


}

window.addEventListener("load", loadEvent);
