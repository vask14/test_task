let arr = [];
arr.push('hello','testTask','array','hie');
console.log(arr);

let arr2 = ['newArray','hello','operator'];
let merged = [...arr,...arr2];
console.log(merged);

merged.sort();
console.log(merged);

let uniq =  [...new Set(merged)];
console.log(uniq);

let filterArray = merged.filter(item => item.length >= 5);
console.log(filterArray);

let newArr = merged.map(item => 'CODE' + item);
console.log(newArr);

let set = new Set();
let arr3 = [1,2,3,4];
let arr4 = [4,5,6,7];
set.add(arr3);
set.add(arr4);
console.log(set);

console.log(Array.from(set));

let regEx = "/\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}/"; 


let nodeList = document.querySelectorAll('.codes p');
let NodeArray = Array.from(nodeList);
let codesArr = [];
NodeArray.forEach(item => codesArr.push(item.innerHTML.match(/^(.*?)is/)[1]));
console.log(codesArr.sort());

