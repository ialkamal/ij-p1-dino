// Create Dino Constructor
function Dino(dinosaur, imageURL) {
  this.species = dinosaur.species;
  this.weight = dinosaur.weight;
  this.height = dinosaur.height;
  this.diet = dinosaur.diet;
  this.where = dinosaur.where;
  this.when = dinosaur.when;
  this.fact = dinosaur.fact;
  this.imageURL = imageURL;
}

// Create Dino Objects
const dinos = [];
fetch("./dino.json")
  .then((res) => res.json())
  .then((res) => {
    res.Dinos.forEach((dino) => {
      dinos.push(new Dino(dino, `./images/${dino.species.toLowerCase()}.png`));
    });
  });

// Create Human Object and get data using IIFE
const human = (function () {
  return { imageURL: "./images/human.png" };
})();

//Get Form Data
function getFormData() {
  const selectDiet = document.getElementById("diet");
  Object.assign(human, {
    name: document.getElementById("name").value,
    height:
      parseInt(document.getElementById("feet").value) * 12 +
        parseInt(document.getElementById("inches").value) || 0,
    weight: parseInt(document.getElementById("weight").value) || 0,
    diet: selectDiet.options[selectDiet.selectedIndex].value,
  });
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function compareHeight(human) {
  if (this.height > human.height)
    return `The ${this.species} is taller than you!`;
  else if (this.height < human.height)
    return `The ${this.species} is shorter than you!`;
  else return `The ${this.species} and you have the same height!`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function compareWeight(human) {
  if (this.weight > human.weight)
    return `The ${this.species} is heavier than you!`;
  else if (this.weight < human.weight)
    return `The ${this.species} is lighter than you!`;
  else return `The ${this.species} and you have the same weight!`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function compareDiet(human) {
  return `You're a ${human.diet} while a ${this.species} is a ${this.diet}`;
};

// Generate Tiles for each Dino in Array
function addTile(title, imageURL, fact) {
  const tile = document.createElement("div");
  tile.className = "grid-item";

  const titleElement = document.createElement("h3");
  titleElement.innerText = title;
  tile.appendChild(titleElement);

  const imageElement = document.createElement("img");
  imageElement.src = imageURL;
  tile.appendChild(imageElement);

  const factElement = document.createElement("p");
  factElement.innerText = fact;
  tile.appendChild(factElement);

  return tile;
}

//Select an item from an array randomly
function getRandomFact(facts) {
  return facts[Math.floor(Math.random() * facts.length)];
}

// Add tiles to DOM
function addTiles(dinos, human) {
  const tiles = document.getElementById("grid");
  dinos.forEach((dino, index) => {
    //get random facts for dino based on comparison functions and JSON data
    facts = [
      dino.compareHeight(human),
      dino.compareWeight(human),
      dino.compareDiet(human),
      dino.fact,
    ];

    //place human in the middle
    if (index === Math.floor(dinos.length / 2))
      tiles.appendChild(addTile(human.name, human.imageURL, ""));

    //add the dinos
    if (dino.species === "Pigeon")
      tiles.appendChild(addTile(dino.species, dino.imageURL, dino.fact));
    else
      tiles.appendChild(
        addTile(dino.species, dino.imageURL, getRandomFact(facts))
      );
  });
}

// On button click, prepare and display infographic
const compareMeBtn = document.getElementById("btn");
compareMeBtn.addEventListener("click", function () {
  //Get Form data and assign to the human object
  getFormData();

  // Remove form from screen
  document.getElementById("dino-compare").style.display = "none";

  //Add Dinos, Bird and Human
  addTiles(dinos, human);
});
