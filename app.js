// definitions des variables
const champIngredient = document.getElementsByClassName('champ_ingredient')[0];
const champAppareil = document.getElementsByClassName('champ_appareil')[0];
const champUstensiles = document.getElementsByClassName('champ_ustensiles')[0];
const imgIngredient = document.getElementsByClassName('img_ingredient')[0];
const imgAppareil = document.getElementsByClassName('img_appareil')[0];
const imgUstensiles = document.getElementsByClassName('img_ustensiles')[0];
const rechercheTags = document.getElementsByClassName('recherche_tags');
const rechercheIng = document.getElementsByClassName('recherche_ingredient')[0];
const rechercheApp = document.getElementsByClassName('recherche_appareil')[0];
const rechercheUst = document.getElementsByClassName('recherche_ustensiles')[0];
const listeRecette = document.getElementsByClassName('liste_recette')[0];
const listeIngredient = document.getElementById('liste_ingredients');
const listeAppareil = document.getElementById('liste_appareil');
const listeUstensiles = document.getElementById('liste_ustensiles');

let listes = [listeIngredient, listeAppareil, listeUstensiles];
let tableauRecette = [];
let tableauRecetteFiltre = [];


// recuperation des données du site
fetch("./data.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    tableauRecette = data.recipes;
    console.log(tableauRecette);
    affichageRecette();
  })




  // rendre la recherche case insensitive



// affichage dynamique des recettes
function affichageRecette() {
  listeRecette.innerHTML = "";
  for (let i in tableauRecette) {
    listeRecette.innerHTML += `
      <div class="carte_recette card">
        <div class="card-img-top"></div>
        <div class="card-body">
          <div class="carte_contenu">
            <div class="header_carte">
              <h2 class="card-title">${tableauRecette[i].name}</h2>
              <div class="recette_duree">
                <img src="./images/temps_logo.png" alt="">
                <p>${tableauRecette[i].time} min</p>
              </div>
            </div>
            <div class="recette_contenu">
              <div class="recette_ingredients">
                <ul class="recette_ingredients_liste">
                </ul>
              </div>
              <div class="recette">
                <p class="card-text">${tableauRecette[i].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const recetteIngredientsListe = document.getElementsByClassName('recette_ingredients_liste')[i];
    for (let x in tableauRecette[i].ingredients) {
      let ingredient = tableauRecette[i].ingredients[x].ingredient+":";
      let quantity = tableauRecette[i].ingredients[x].quantity;
      let unit = tableauRecette[i].ingredients[x].unit;
      if (ingredient == undefined) {
        ingredient = "";
      }
      if ((quantity == undefined) && (unit == undefined)) {
        ingredient = tableauRecette[i].ingredients[x].ingredient;
      }
      if (quantity == undefined) {
        quantity = "";
      }
      if (unit == undefined) {
        unit = "";
      }
      recetteIngredientsListe.innerHTML += `
      <li><span class="gras">${ingredient}</span> ${quantity} ${unit}</li>`
    }
  }
}


  // ajout de la mise en forme dynamique des dropdowns

// changement dynmaique des messages polaceholder
function champsPlaceholder(champ, focusMsg, focusoutMsg) {
  champ.addEventListener('focus', function() {
    champ.setAttribute("placeholder", focusMsg)
  })
  champ.addEventListener('focusout', function() {
    champ.setAttribute("placeholder", focusoutMsg)
  })  
}
champsPlaceholder(champIngredient, "Recherche un ingrédient", "Ingrédients");
champsPlaceholder(champAppareil, "Recherche un appareil", "Appareil");
champsPlaceholder(champUstensiles, "Recherche un ustensiles", "Ustensiles");

dropdownsLogique(imgIngredient, listeIngredient, champIngredient, rechercheIng);
dropdownsLogique(imgAppareil, listeAppareil, champAppareil, rechercheApp);
dropdownsLogique(imgUstensiles, listeUstensiles, champUstensiles, rechercheUst);

function dropdownsLogique(img, liste, champ, recherche) {
  img.addEventListener('click', function() {
    if (liste.classList.contains('show') === true) {
      // appelle de la fonction de fermeture du dropdown au clic sur la fleche
      fermetureDropdown(liste, img, champ, recherche);
    } else if (liste.classList.contains('show') === false) {
      // fermeture des dropdown deja ouvert
      if (listes[0].classList.contains('show') === true) {
        fermetureDropdown(listeIngredient, imgIngredient, champIngredient, rechercheIng);
      } else if (listes[1].classList.contains('show') === true) {
        fermetureDropdown(listeAppareil, imgAppareil, champAppareil, rechercheApp);
      } else if (listes[2].classList.contains('show') === true) {
        fermetureDropdown(listeUstensiles, imgUstensiles, champUstensiles, rechercheUst);
      }
      // appelle de la fonction d'ouverture du dropdown au clic sur la fleche
      overtureDropdown(champ, liste, img, recherche);
    }
  })
  
  champ.addEventListener('click', function() {
    if (liste.classList.contains('show') === false) {
      // fermeture des dropdown deja ouvert
      if (listes[0].classList.contains('show') === true) {
        fermetureDropdown(listeIngredient, imgIngredient, champIngredient, rechercheIng);
      } else if (listes[1].classList.contains('show') === true) {
        fermetureDropdown(listeAppareil, imgAppareil, champAppareil, rechercheApp);
      } else if (listes[2].classList.contains('show') === true) {
        fermetureDropdown(listeUstensiles, imgUstensiles, champUstensiles, rechercheUst);
      }
      // appelle de la fonction d'ouverture du dropdown au clic sur l'input
      overtureDropdown(champ, liste, img, recherche);
    }
  })    
}

// fonction de fermeture du dropdown
function fermetureDropdown(liste, img, champ, recherche) {
  liste.classList.remove("show");
  img.setAttribute("src", "./images/menu_ferme.png");
  champ.style.borderRadius = "5px 5px 5px 5px"
  recherche.style.width = '170px';
  champ.blur();
}

// fonction d'ouverture du dropdown
function overtureDropdown(champ, liste, img, recherche) {
  champ.focus();
  liste.classList.add("show");
  img.setAttribute("src", "./images/menu_ouvert.png");
  champ.style.borderRadius = "5px 5px 0px 0px"
  recherche.style.width = '650px';
}


// fermeture des dropdown quand on click a l'exterieur

// document.addEventListener('click', function(e) {
//   if ((listeIng.classList.contains('show') === true) && (imgIngredient != e.target || champIngredient != e.target || rechercheIng != e.target || listeIng != e.target)) {
//     listeIng.classList.remove("show");
//     imgIngredient.setAttribute("src", "./images/menu_ferme.png");
//     rechercheIng.style.width = '170px';
//   }
//   console.log(e.target);
// })



