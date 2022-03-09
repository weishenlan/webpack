import { name } from './b'
import tutu from './tutu.jpg'
import './a.css'

let add = (a, b) => a + b;
console.log(add(3, 5));

console.log('tutu', tutu)
console.log(name)

const dom = `<img src=${tutu} />`
window.onload = function() {
    document.getElementById('main').innerHTML = dom
}