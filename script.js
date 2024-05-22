const RANDOM_IMAGES =
  "https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_CirXoS5DoZP8hpnK7iGb6WkWuzVcJ6C3NubsfteDEJh64CtCRbhD89djzIk2cBvj";
const INPUT = document.getElementById("searchInp");
const FIND_BTN = document.getElementById("findBtn");
const SUGGESTIONS_CONTAINER = document.getElementById("sugestions");
let breedsArr = null;
let inputVal = null;
let activeBTNs = document.getElementsByClassName("activeBTN");
const INFO_BAR = document.getElementById("infoBar");
const INFO_UL = document.getElementById("infoUl");
const GALERY = document.getElementById("galery");
fetch("https://api.thecatapi.com/v1/breeds")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    breedsArr = data;
  });

function validSearch() {
  let inputed = inputVal;
  let passed = false;
  let passedIndex = -1;

  for (let index = 0; index < breedsArr.length; ++index) {
    let splitedName = breedsArr[index].name.split(" ");

    if (splitedName[0].toLowerCase().startsWith(inputed)) {
      passed = true;
      passedIndex = index;
      break;
    }
  }

  if (passed && passedIndex !== -1) {
    drawInfo(passedIndex);
  } else {
    alert("Not Found");
  }
}

function drawInfo(passedIndex) {
  let images = null;
  console.log(breedsArr[passedIndex].id);
  fetch(RANDOM_IMAGES + "&" + "breed_ids=" + breedsArr[passedIndex].id)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      let remoover = document.getElementById("mainPic");
      if (remoover) {
        remoover.remove();
      }
      images = data;
      let mainImg = document.createElement("img");
      mainImg.src = data[0].url;
      mainImg.id = "mainPic";
      document.getElementById("inner").append(mainImg);
      document.getElementById("infoName").innerHTML =
        breedsArr[passedIndex].name + " Cat";

      document.getElementById("OC").innerHTML =
        "Origin Country: " + breedsArr[passedIndex].origin;
      document.getElementById("T").innerHTML =
        " Temperament: " + breedsArr[passedIndex].temperament;
      document.getElementById("D").innerHTML =
        " description: " + breedsArr[passedIndex].description;
      document.getElementById("W").innerHTML =
        " weight: " + breedsArr[passedIndex].weight.metric + "kg";
      document.getElementById("Wik").href =
        breedsArr[passedIndex].wikipedia_url;

      INFO_BAR.style.display = "flex";

      return data;
    })
    .then((data) => {
      GALERY.innerHTML = "";
      for (let index = 1; index < data.length; ++index) {
        let photo = document.createElement("img");
        photo.id = "img" + index;
        photo.src = data[index].url;
        photo.className = "imgs";
        GALERY.append(photo);
      }
    });
}

function drawSuggestsment(breed, passedIndex) {
  let button = document.createElement("button");
  button.id = breed.id;
  button.innerHTML = breed.name;
  button.className = "activeBTN";
  SUGGESTIONS_CONTAINER.append(button);
  button.addEventListener("click", () => {
    drawInfo(passedIndex);
  });
}
function suggestions(inputed) {
  SUGGESTIONS_CONTAINER.innerHTML = "";
  let passedIndex = null;
  for (let index = 0; index < breedsArr.length; ++index) {
    let passed = false;
    for (let j = 0; j < inputed.length; ++j) {
      let splitedName = breedsArr[index].name.split(" ");
      if (splitedName[0][j].toLowerCase() !== inputed[j]) {
        passed = false;
        break;
      } else {
        passed = true;
        passedIndex = index;
      }
    }
    if (passed) {
      drawSuggestsment(breedsArr[index], passedIndex);
    }
  }
}

INPUT.addEventListener("input", () => {
  inputVal = INPUT.value.toLowerCase();
  suggestions(inputVal);
  console.log("This is inputed", inputVal);
});

FIND_BTN.addEventListener("click", function () {
  validSearch();
});
// FIND_BTN.addEventListener("keydown", function (event) {
//   if (event.key == "enter") {
//     console.log("worked");
//     validSearch();
//   }
// });
