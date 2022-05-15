const url = "http://universities.hipolabs.com";

const textField = document.querySelector("input.form-control");
const btnSearch = document.querySelector("input.btn");
const contentListGroup = document.querySelector("ul.list-group");
const resultsFound = document.getElementById("results-found");
resultsFound.innerHTML = "<br><br><br>";
const btnGrpFooter = document.querySelector("div.btn-group");

let data;

// Execute a function when the user presses a key on the keyboard
textField.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    btnSearch.click();
  }
});

//fetchData();

async function fetchData() {
  if (textField.value != "") {
    let url =
      "http://universities.hipolabs.com/search?" +
      new URLSearchParams({
        country: textField.value,
      });

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.data = json;

      processData(this.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    contentListGroup.innerHTML = "";
    resultsFound.innerHTML = "<br><br><br>";
  }
}

// btnSearch.addEventListener("click", (e) => {
//   if (textField.value != "") {
//     fetch(
//       "http://universities.hipolabs.com/search?" +
//         new URLSearchParams({
//           country: textField.value,
//         })
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         this.data = data;
//         console.log(this.data);
//         processData(data);
//         // printList(data);
//       });
//   } else {
//     contentListGroup.innerHTML = "";
//     resultsFound.innerHTML = "<br><br><br>";
//   }
// });

function processData(data) {
  let chunkedData = segmentData(data);
  // console.log(chunkedData);

  printList(chunkedData[0]);
  showPageButtons(chunkedData);
}

function showPageButtons(chunkedData) {
  btnGrpFooter.innerHTML = "";

  chunkedData.forEach((element, index) => {
    let inputElement = document.createElement("input");
    inputElement.type = "button";
    inputElement.className = "btn btn-dark";
    inputElement.value = parseInt(index) + 1;
    // inputElement.textContent = parseInt(index) + 1;
    // inputElement.innerText = parseInt(index) + 1;
    inputElement.addEventListener("click", function () {
      printList(chunkedData[index]);
    });
    btnGrpFooter.appendChild(inputElement);

    // btnGrpFooter.innerHTML += index % 8 == 0 ? "<br>" : "";

    //   btnGrpFooter.innerHTML +=
    //     '<button type="button" class="btn btn-dark" onclick="printList(chunkedData[' +
    //     index +
    //     ']);">' +
    //     (parseInt(index) + 1) +
    //     "</button>";
  });
}

//segments the array of JSON data into an array of arrays of JSON data
function segmentData(data) {
  let chunkSize = 100;
  let dataClone = [...data];
  let chunkedData = new Array();
  let numberOfIterations = Math.floor(data.length / chunkSize);

  if (data.length % chunkSize > 0) {
    numberOfIterations++;
  }

  for (let i = 0; i < numberOfIterations; i++) {
    chunkedData.push(dataClone.splice(0, chunkSize));
  }
  // console.log(numberOfIterations);
  // console.log(chunkedData);
  return chunkedData;
}

//prints the list of universities providing
//data: an array of json objects
function printList(data) {
  contentListGroup.innerHTML = "";
  resultsFound.innerHTML = "";
  //prints the number of results found
  resultsFound.innerHTML =
    "<br><strong><p>" + this.data.length + " results found</p></strong>";
  //prints the list of results
  data.forEach((element) => {
    // contentListGroup.innerHTML +=
    //   '<li class="list-group-item">' + JSON.stringify(element) + "</li>";
    contentListGroup.innerHTML +=
      '<li class="list-group-item">' + objectPrint(element) + "</li>";
  });
}

//formats how an object from data will be printed
function objectPrint(object) {
  let objectString = "";

  objectString +=
    "<strong>" +
    object["name"] +
    '</strong><br><a href="' +
    object["web_pages"][0] +
    '" target="_blank">' +
    object["web_pages"][0] +
    "</a>";

  return objectString;
}

// function fetchData() {
//   fetch(
//     "http://universities.hipolabs.com/search?" +
//       new URLSearchParams({
//         country: textField.textContent,
//       })
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       data;
//       console.log(data);
//     });
// }
