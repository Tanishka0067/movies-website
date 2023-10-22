const api = "https://www.omdbapi.com/?i=tt3896198&apikey=22037589";
let page = 1;
let data = {};
const content = document.querySelector(".content");
const loader = document.querySelector(".loader");
const pages = document.querySelector(".pages");
const defaultText = document.querySelector(".default");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const downloadbutton = document.querySelector(".download");
const text = document.querySelector(".txt");
function insertCard(Details) {
  let image = new Image();
  image.src = Details["Poster"];
  let title = document.createElement("h1");
  title.innerHTML = Details["Title"];
  let year = document.createElement("h3");
  year.innerHTML = Details["Year"];

  const card = document.createElement("div");
  card.classList.add("cards");
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(year);
  content.appendChild(card);
}

function show() {
  document.getElementById("cards").style.visibility = "visible";
}
function search() {
  // document.body.style.background = "rgb(16, 10, 15)";
  content.innerHTML = "";
  loader.style.visibility = "visible";
  const searchValue = document.getElementById("searchbox").value;
  fetch(`${api}&s=${searchValue}&page=${page}`)
    .then((response) => response.json())
    .then((dta) => {
      data = dta;
      text.style.display = "none";
      loader.style.visibility = "hidden";
      pages.style.visibility = "visible";
      // Move the console.log inside this .then() block
      console.log(data);
      if (data["Response"] == "True") {
        defaultText.style.visibility = "hidden";
        downloadbutton.style.visibility = "visible";
        data["Search"].forEach((element) => {
          insertCard(element);
        });
      } else {
        //Show No Results
        defaultText.style.visibility = "visible";
        pages.style.visibility = "hidden";
        downloadbutton.style.visibility = "hidden";
      }
    })
    .catch((err) => {
      console.log("Api didn't fetch");
    });
}

function next() {
  console.log("Calleddddd");
  page++;
  console.log(page);
  search();
}
function previous() {
  console.log("Calleddddd");
  page--;
  console.log(page);
  search();
}
function downloadJSON() {
  const jsonString = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

//  function homedisp(value){
// try{
//   const response = await fetch(`${api}&s=${value}`)
//   const data = response.json()
//     if (data["Response"] == "True") {
//       data["homedisp"].forEach((element) => {
//         insertCard(element);
//       });
//     }
//   }
// }
// function display(){
//   const randomDisplay = randomdisp(arrayData);
//  await homedisp(randomDisplay);

// }
// display();
/*function randomdisp(array){
  const randomvalue = Math.floor(Math.random()*array.length);
  return array[randomvalue];
}
const arrayData = [
  "spider",
  "titanic",
  "anabelle",
  "intersteller",
  "batman",
  "platform",
  "jab we met",
];
function home(){
for(let i=1;i<7;i++){
   ( fetch('api${i}&s=${randomdisp(arrayData)}')
  .then((response)=>{return response.json()}))
  console.log(data);
      if (data["response"] == "True") 
      data["home"].forEach((element) => {
        insertCard(element);
        
})}
}
home();*/
document.querySelector(".searchbar").addEventListener("input", search);
previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
downloadbutton.addEventListener("click", downloadJSON);
