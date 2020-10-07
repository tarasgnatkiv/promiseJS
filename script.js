// 1. Створити сайт використовуючи swapi.dev. вибрати 1 з 6 проперті (films, characters etc..)і зробити запит по них, вибрати одну з перших проперті що отримаєте і витягнувши з неї "url" - отримати конкретну(планету,фільм, персонажа) з всією інформацією про нього. Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано. 

let mainNode = null;
let node = null;
let mainUrl = `https://swapi.dev/api/`;
let inputValue;
let searchNode = null;
let searchUrl = `https://swapi.dev/api/people/?search=`;
window.onload = () => {
    mainNode = fetch(`${mainUrl}`)
        .then(response => response.json())
        .then(result => mainNode = result)
        .then(function () {
            node = fetch(mainNode.people)
                .then(response => response.json())
                .then(result => node = result)
        })

}

people = document.getElementById(`list`);

let showPeople = function () {
    while (people.firstChild) {
        people.removeChild(people.firstChild);
    }
    // console.log(node);
    let result = node.results;
    // console.log(result);

    createList(result);
   
}


// Я ще хотів зробити (оскільки воно робить запит по перших десяти) кнопку некст і шоб вона робила запит по наступних десяти (url із значення .next) і так циклом поки некст не буде null відпиши мені кудась як би це реалізувати  

let search = () => {
    while (people.firstChild) {
        people.removeChild(people.firstChild);
    }
    let filter = document.getElementById(`link`).value;
    searchNode = fetch(`${searchUrl}${filter}`)
        .then(response => response.json())
        .then(result => searchNode = result)
        .then(function() {
            console.log(searchNode);
            let result = searchNode.results;
            createList(result);
            
            
        })


}


let createList = (result) => {
    for (let i = 0; i < result.length; i++) {
        let li = document.createElement(`li`);
        li.innerText = `${result[i].name}`;
        let button = document.createElement(`button`);
        button.innerText = `More Info`;

        button.onclick = function () {
            let listInfo = document.createElement(`ul`);

            for (let key in result[i]) {
                let liInfo = document.createElement(`li`);
                liInfo.innerText = `${key}: ${result[i][key]}`;
                listInfo.appendChild(liInfo);
            }
            let closebtn = document.createElement(`button`);
            closebtn.innerText = `Close`;
            closebtn.onclick = function () {
                listInfo.remove();
            }
            listInfo.appendChild(closebtn);
            li.appendChild(listInfo);
        }
        people.appendChild(li);
        people.appendChild(button)
    }
}