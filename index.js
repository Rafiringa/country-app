// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// Variables :
const contriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "maxToMin";

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));

  console.log(countriesData);
  countriesDisplay();
}

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
const countriesDisplay = () => {
  contriesContainer.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
          <div class="card">
          <img src=${country.flags.svg} alt="Drapeau ${
          country.translations.fra.common
        }">
            <h3>${country.translations.fra.common}</h3>
            <h4>${country.capital}</h4>
            <p>Population : ${country.population.toLocaleString()}</p>
          </div>
    `
    )
    .join("");
};

window.addEventListener("load", fetchCountry);

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
inputSearch.addEventListener("input", countriesDisplay);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});
// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
