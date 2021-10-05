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
const tagsListeIngredients = document.getElementsByClassName('tags_ingredients')[0];
const tagsListeAppareil = document.getElementsByClassName('tags_appareil')[0];
const tagsListeUstensiles = document.getElementsByClassName('tags_ustensiles')[0];
const listeTags = document.getElementsByClassName('liste_tags')[0];

let dataSite = {};
let listes = [listeIngredient, listeAppareil, listeUstensiles];
let tableauRecette = [];
let tableauRecetteFiltre = [];
let tagsIngredients = [];
let tagsIngredientsDisponible = [];
let tagsAppareil = [];
let tagsUstensiles = [];
// rendre la recherche case insensitive

// recuperation des données du site
fetch("./data.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log(data);
    dataSite = data;
    tableauRecette = data.recipes;
    tagsIngredients = [...data.ingredients];
    tagsAppareil = [...data.appareil];
    tagsUstensiles = [...data.ustensiles];
    selectedTagsIngredients = [];
    selectedTagsAppareil = [];
    selectedTagsUstensiles = [];
    console.log(tableauRecette);
    affichageTagsIngredients(tagsIngredients);
    filtrageRecette(tableauRecette);
  })


// affichageTagsIngredients();
// affichageTagsAppareil();



function filtrageRecette(recette) {
  let test = [...tableauRecette];
  test.push(5);
  console.log(tableauRecette);
  console.log(test);
  affichageRecette(recette);
}


function affichageTagsIngredients(tagsIng) {
  tagsListeIngredients.innerHTML = "";
  console.log(tagsIng);
  if (listeIngredient.classList.contains('show')) {
    if (tagsIng.length == 1) {
      rechercheIng.style.width = '220px';
    }
    if (tagsIng.length == 2) {
      rechercheIng.style.width = '400px';
    }
    if (tagsIng.length > 2) {
      rechercheIng.style.width = '650px';
    }
  }
  for (let i in tagsIng) {
    tagsListeIngredients.innerHTML += `<a class="tag_ingredient" href=""><p>${tagsIng[i]}</p></a>`;
  }
  logiqueTagsIngredients()
}

function logiqueTagsIngredients() {
  const tagIngredient = document.getElementsByClassName('tag_ingredient');
  for (let x = 0; x < tagIngredient.length; x++) {
    tagIngredient[x].addEventListener('click', function(e) {
      e.preventDefault();
      recuperationTagIngDispo();
      selectedTagsIngredients.push(this.textContent);
      console.log(selectedTagsIngredients);
      recuperationTagIngDispo();
      affichageTagsIngredients(tagsIngredientsDisponible);
      badgeTagsIngredients();
    })
  }
}

// appelez cette function parametré
function badgeTagsIngredients() {
  listeTags.innerHTML = "";
  for (let i = 0; i < selectedTagsIngredients.length; i++) {
    listeTags.innerHTML += `
      <span class="badge badge_bleu">${selectedTagsIngredients[i]}<img src="./images/tag_fermer.png" alt="button de suppression d'un tag"></span>`;   
  }
  badgeSuppression();
}

function badgeSuppression() {
  const badge = document.getElementsByClassName('badge');
  console.log(listeTags.childElementCount);
  for (let y = 0; y < listeTags.children.length; y++) {
    badge[y].addEventListener('click', function() { 
      selectedTagsIngredients.splice(selectedTagsIngredients.indexOf(badge[y].textContent), 1);
      recuperationTagIngDispo();
      badgeTagsIngredients();
      affichageTagsIngredients(tagsIngredientsDisponible);
    })
  }
}

// recuperation des tags ingrédients disponible
function recuperationTagIngDispo() {
  tagsIngredients = [...dataSite.ingredients]
  console.log("tagIng "+tagsIngredients.length);
  console.log("tagDispo "+tagsIngredientsDisponible.length);
  tagsIngredientsDisponible = [...tagsIngredients];
  console.log("tagDispo "+tagsIngredientsDisponible.length);
  if (selectedTagsIngredients.length > 0) {
    for (let i = 0; i < selectedTagsIngredients.length; i++) {
      tagsIngredientsDisponible.splice(tagsIngredientsDisponible.indexOf(selectedTagsIngredients[i]), 1);
    }
  }
  console.log("apres");
  console.log("tagIng "+tagsIngredients.length);
  console.log("tagDispo "+tagsIngredientsDisponible.length);
}

// champ de recherche ingredient
champIngredient.addEventListener('input', function() {
  if (champIngredient.value.length == 0) {
    recuperationTagIngDispo();
    affichageTagsIngredients(tagsIngredientsDisponible);
  }
  if (champIngredient.value.length > 0) {
    
    let champValue = champIngredient.value;
    let filtreTagsIng = [];
    recuperationTagIngDispo();
    for (let i = 0; i < tagsIngredientsDisponible.length; i++) {
      if (tagsIngredientsDisponible[i].includes(champValue)) {
        filtreTagsIng.push(tagsIngredientsDisponible[i]);
      }
    }
    affichageTagsIngredients(filtreTagsIng);
  }
})






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
  champ.style.borderRadius = "5px 5px 5px 5px";
  recherche.style.width = '170px';
  champ.blur();
}

// fonction d'ouverture du dropdown
function overtureDropdown(champ, liste, img, recherche) {
  champ.focus();
  liste.classList.add("show");
  img.setAttribute("src", "./images/menu_ouvert.png");
  champ.style.borderRadius = "5px 5px 0px 0px";
  recherche.style.width = '650px';
}




