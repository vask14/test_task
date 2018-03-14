const arrayOfObj = [];
const discountArray = [];
let originPriceObj = {};
let bestCodeObj = {};
const codeObj = {};
let originPrice;
const nodeElements = document.querySelectorAll('p');
const nodeArr = Array.from(nodeElements);

nodeArr.forEach(element => getDiscount(element.innerHTML,codeObj));

function getDiscount(str,codeObj) {
    originPrice = document.querySelector('h1').innerHTML.replace(/\D/g,'');
    let codeName = str.match(/'(.*[^'])'/)[1];
    let price = str.replace(/\D/g,'').slice(1);
    let discount = originPrice - price;
    discountArray.push(discount);
    codeObj[codeName] = discount;
    return codeObj;
}

function getBestCode() {
    bestCodeObj = {
        bestCode: Object.keys(codeObj).reduce((a, b) => codeObj[a] > codeObj[b] ? a : b),
        bestCodeDiscount: Math.max(...discountArray)
    };
    return bestCodeObj;
}

function getOriginPrice() {
    originPriceObj = {
        originalPrice: originPrice
    };
    return originPriceObj;
}

const bestCode = getBestCode(bestCodeObj);
const originalPrice = getOriginPrice(originPriceObj);
arrayOfObj.push(codeObj,bestCode,originalPrice);
console.log('Array',arrayOfObj);
 