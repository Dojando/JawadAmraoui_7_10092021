// definitions des variables
const champIngredient = document.getElementsByClassName('champ_ingredient')[0];
const champAppareil = document.getElementsByClassName('champ_appareil')[0];
const champUstensiles = document.getElementsByClassName('champ_ustensiles')[0];
const champPrincipal = document.getElementsByClassName('champ_principal')[0];
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
const listeTagsIng = document.getElementsByClassName('liste_tags_ingredients')[0];
const listeTagsApp = document.getElementsByClassName('liste_tags_appareil')[0];
const listeTagsUst = document.getElementsByClassName('liste_tags_ustensiles')[0];

let dataSite = {};
let listes = [listeIngredient, listeAppareil, listeUstensiles];
let tableauRecette = [];
let tableauRecetteFiltre = [];
let tagsIngredients = [];
let tagsIngredientsDisponible = [];
let tagsAppareil = [];
let tagsAppareilDisponible = [];
let tagsUstensiles = [];
let tagsUstensilesDisponible = [];
let listeRecetteDispo = [];

// recuperation des données du site
fetch("./data.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    dataSite = data;
    tableauRecette = data.recipes;
    tagsIngredients = [...data.ingredients];
    tagsAppareil = [...data.appareil];
    tagsUstensiles = [...data.ustensiles];
    selectedTagsIngredients = [];
    selectedTagsAppareil = [];
    selectedTagsUstensiles = [];
    affichageTagsIngredients(tagsIngredients);
    affichageTagsAppareil(tagsAppareil);
    affichageTagsUstensiles(tagsUstensiles)
    filtrageRecette();
  })



// Appel de la fonction filtrageRecette a chaque entrée dans le champ principal, et si value.length >= 3
champPrincipal.addEventListener('input', function() {
  if (champPrincipal.value.length >= 2) {
    filtrageRecette();    
  }
});

function filtrageRecette() {
  let listeRecette = [...tableauRecette];

  // filtre tags ingredients
  if (selectedTagsIngredients.length > 0) {
    for (let i = 0; i < selectedTagsIngredients.length; i++) {
      for (let z = 0; z < listeRecette.length; z++) {
        let valid = false;
        for (let x = 0; x < listeRecette[z].ingredients.length; x++) {
          if (listeRecette[z].ingredients[x].ingredient.toLowerCase() == selectedTagsIngredients[i].toLowerCase()) {
            valid = true;
          }
        }
        if (valid == false) {
          listeRecette.splice(z, 1);
          z = -1;
        }
      }
    }
  }

  // filtre tags appareil
  if (selectedTagsAppareil.length > 0) {
    for (let i = 0; i < selectedTagsAppareil.length; i++) {
      for (let z = 0; z < listeRecette.length; z++) {
        let valid = false;
        if (listeRecette[z].appliance.toLowerCase() == selectedTagsAppareil[i].toLowerCase()) {
          valid = true;
        }
        if (valid == false) {
          listeRecette.splice(z, 1);
          z = -1;
        }
      }
    }
  }

  // filtre tags ustensiles
  if (selectedTagsUstensiles.length > 0) {
    for (let i = 0; i < selectedTagsUstensiles.length; i++) {
      for (let z = 0; z < listeRecette.length; z++) {
        let valid = false;
        for (let x = 0; x < listeRecette[z].ustensils.length; x++) {
          if (listeRecette[z].ustensils[x].toLowerCase() == selectedTagsUstensiles[i].toLowerCase()) {
            valid = true;
          }
        }
        if (valid == false) {
          listeRecette.splice(z, 1);
          z = -1;
        }
      }
    }
  }

  // verification des input
  if (champPrincipal.value.length >= 3) {
    let champValue = champPrincipal.value.toLowerCase();
    let recetteValid = listeRecette.filter(function(el, index) {
      let valid = false;
      let titreRecette = el.name.toLowerCase();
      let descriptionRecette = el.description.toLowerCase();
      let ingRecette = [];
      el.ingredients.forEach(function(element) {
        ingRecette.push(element.ingredient.toLowerCase());
      })
      ingRecette.forEach(function(ing) {
        if (ing.includes(champValue) == true) {
          valid = true;
        }
      })
      if ((titreRecette.includes(champValue) == true) || (descriptionRecette.includes(champValue) == true) || (valid == true)) {
        return true;
      }
    })
    listeRecette = recetteValid;
  }

  // recuperation des tags des recettes disponible
  let tagRecupIng = [];
  let tagRecupApp = [];
  let tagRecupUst = [];
  // tags ingredients
  for (let n in listeRecette) {
    for (let x in listeRecette[n].ingredients) {
      tagRecupIng.push(listeRecette[n].ingredients[x].ingredient.toLowerCase());
      let uniq = [...new Set(tagRecupIng)];
      tagRecupIng = uniq;
    }
  }
  // tags appareil
  for (let n in listeRecette) {
    tagRecupApp.push(listeRecette[n].appliance.toLowerCase());
    let uniq = [...new Set(tagRecupApp)];
    tagRecupApp = uniq;
  }
  // tags ustensiles
  for (let n in listeRecette) {
    for (let x in listeRecette[n].ustensils) {
      tagRecupUst.push(listeRecette[n].ustensils[x].toLowerCase());
      let uniq = [...new Set(tagRecupUst)];
      tagRecupUst = uniq;
    }
  }

  tagsIngredients = [...tagRecupIng];
  tagsAppareil = [...tagRecupApp];
  tagsUstensiles = [...tagRecupUst];

  affichageRecette(listeRecette);
  recuperationTagIngDispo()
  recuperationTagAppDispo()
  recuperationTagUstDispo()
  affichageTagsIngredients(tagsIngredientsDisponible);
  affichageTagsAppareil(tagsAppareilDisponible);
  affichageTagsUstensiles(tagsUstensilesDisponible);
}

// Fonctionnement du menu Ingrédients

function affichageTagsIngredients(tagsIng) {
  tagsListeIngredients.innerHTML = "";
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
      recuperationTagIngDispo();
      affichageTagsIngredients(tagsIngredientsDisponible);
      badgeTagsIngredients();
      filtrageRecette();
    })
  }
}

function badgeTagsIngredients() {
  listeTagsIng.innerHTML = "";
  for (let i = 0; i < selectedTagsIngredients.length; i++) {
    listeTagsIng.innerHTML += `
      <span class="badge badge_bleu">${selectedTagsIngredients[i]}<img src="./images/tag_fermer.png" alt="button de suppression d'un tag"></span>`;   
  }
  badgeSuppressionIng();
}

// logique de suppression de tag
function badgeSuppressionIng() {
  const badgeIng = document.querySelectorAll('.liste_tags_ingredients .badge');
  for (let y = 0; y < listeTagsIng.children.length; y++) {
    badgeIng[y].querySelector("img").addEventListener('click', function() { 
      selectedTagsIngredients.splice(selectedTagsIngredients.indexOf(badgeIng[y].textContent), 1);
      recuperationTagIngDispo();
      badgeTagsIngredients();
      affichageTagsIngredients(tagsIngredientsDisponible);
      filtrageRecette();
    })
  }
}

// recuperation des tags ingrédients disponible
function recuperationTagIngDispo() {
  tagsIngredientsDisponible = [...tagsIngredients];
  if (selectedTagsIngredients.length > 0) {
    for (let i = 0; i < selectedTagsIngredients.length; i++) {
      tagsIngredientsDisponible.splice(tagsIngredientsDisponible.indexOf(selectedTagsIngredients[i]), 1);
    }
  }
}

// logique du champ de recherche ingredient
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



// Fonctionnement du menu Appareil

function affichageTagsAppareil(tagsApp) {
  tagsListeAppareil.innerHTML = "";
  if (listeAppareil.classList.contains('show')) {
    if (tagsApp.length == 1) {
      rechercheApp.style.width = '220px';
    }
    if (tagsApp.length == 2) {
      rechercheApp.style.width = '400px';
    }
    if (tagsApp.length > 2) {
      rechercheApp.style.width = '650px';
    }
  }
  for (let i in tagsApp) {
    tagsListeAppareil.innerHTML += `<a class="tag_appareil" href=""><p>${tagsApp[i]}</p></a>`;
  }
  logiqueTagsAppareil()
}

function logiqueTagsAppareil() {
  const tagAppareil = document.getElementsByClassName('tag_appareil');
  for (let x = 0; x < tagAppareil.length; x++) {
    tagAppareil[x].addEventListener('click', function(e) {
      e.preventDefault();
      recuperationTagAppDispo();
      selectedTagsAppareil.push(this.textContent);
      recuperationTagAppDispo();
      affichageTagsAppareil(tagsAppareilDisponible);
      badgeTagsAppareil();
      filtrageRecette();
    })
  }
}

function badgeTagsAppareil() {
  listeTagsApp.innerHTML = "";
  for (let i = 0; i < selectedTagsAppareil.length; i++) {
    listeTagsApp.innerHTML += `
      <span class="badge badge_vert">${selectedTagsAppareil[i]}<img src="./images/tag_fermer.png" alt="button de suppression d'un tag"></span>`;   
  }
  badgeSuppressionApp();
}

function badgeSuppressionApp() {
  const badgeApp = document.querySelectorAll('.liste_tags_appareil .badge');
  for (let y = 0; y < listeTagsApp.children.length; y++) {
    badgeApp[y].querySelector("img").addEventListener('click', function() { 
      selectedTagsAppareil.splice(selectedTagsAppareil.indexOf(badgeApp[y].textContent), 1);
      recuperationTagAppDispo();
      badgeTagsAppareil();
      affichageTagsAppareil(tagsAppareilDisponible);
      filtrageRecette();
    })
  }
}

// recuperation des tags ingrédients disponible
function recuperationTagAppDispo() {
  // tagsAppareil = [...dataSite.appareil]
  tagsAppareilDisponible = [...tagsAppareil];
  if (selectedTagsAppareil.length > 0) {
    for (let i = 0; i < selectedTagsAppareil.length; i++) {
      tagsAppareilDisponible.splice(tagsAppareilDisponible.indexOf(selectedTagsAppareil[i]), 1);
    }
  }
}

// champ de recherche ingredient
champAppareil.addEventListener('input', function() {
  if (champAppareil.value.length == 0) {
    recuperationTagIngDispo();
    affichageTagsAppareil(tagsAppareilDisponible);
  }
  if (champAppareil.value.length > 0) {
    
    let champValue = champAppareil.value;
    let filtreTagsApp = [];
    recuperationTagIngDispo();
    for (let i = 0; i < tagsAppareilDisponible.length; i++) {
      if (tagsAppareilDisponible[i].includes(champValue)) {
        filtreTagsApp.push(tagsAppareilDisponible[i]);
      }
    }
    affichageTagsAppareil(filtreTagsApp);
  }
})



// Fonctionnement du menu Ustensiles

function affichageTagsUstensiles(tagsUst) {
  tagsListeUstensiles.innerHTML = "";
  if (listeUstensiles.classList.contains('show')) {
    if (tagsUst.length == 1) {
      rechercheUst.style.width = '220px';
    }
    if (tagsUst.length == 2) {
      rechercheUst.style.width = '400px';
    }
    if (tagsUst.length > 2) {
      rechercheUst.style.width = '650px';
    }
  }
  for (let i in tagsUst) {
    tagsListeUstensiles.innerHTML += `<a class="tag_ustensile" href=""><p>${tagsUst[i]}</p></a>`;
  }
  logiqueTagsUstensiles()
}

function logiqueTagsUstensiles() {
  const tagUstensile = document.getElementsByClassName('tag_ustensile');
  for (let x = 0; x < tagUstensile.length; x++) {
    tagUstensile[x].addEventListener('click', function(e) {
      e.preventDefault();
      recuperationTagUstDispo();
      selectedTagsUstensiles.push(this.textContent);
      recuperationTagUstDispo();
      affichageTagsUstensiles(tagsUstensilesDisponible);
      badgeTagsUstensiles();
      filtrageRecette();
    })
  }
}

function badgeTagsUstensiles() {
  listeTagsUst.innerHTML = "";
  for (let i = 0; i < selectedTagsUstensiles.length; i++) {
    listeTagsUst.innerHTML += `
      <span class="badge badge_rouge">${selectedTagsUstensiles[i]}<img src="./images/tag_fermer.png" alt="button de suppression d'un tag"></span>`;   
  }
  badgeSuppressionUst();
}

function badgeSuppressionUst() {
  const badgeUst = document.querySelectorAll('.liste_tags_ustensiles .badge');
  for (let y = 0; y < listeTagsUst.children.length; y++) {
    badgeUst[y].querySelector("img").addEventListener('click', function() { 
      selectedTagsUstensiles.splice(selectedTagsUstensiles.indexOf(badgeUst[y].textContent), 1);
      recuperationTagUstDispo();
      badgeTagsUstensiles();
      affichageTagsUstensiles(tagsUstensilesDisponible);
      filtrageRecette();
    })
  }
}

// recuperation des tags ingrédients disponible
function recuperationTagUstDispo() {
  tagsUstensilesDisponible = [...tagsUstensiles];
  if (selectedTagsUstensiles.length > 0) {
    for (let i = 0; i < selectedTagsUstensiles.length; i++) {
      tagsUstensilesDisponible.splice(tagsUstensilesDisponible.indexOf(selectedTagsUstensiles[i]), 1);
    }
  }
}

// champ de recherche ingredient
champUstensiles.addEventListener('input', function() {
  if (champUstensiles.value.length == 0) {
    recuperationTagUstDispo();
    affichageTagsUstensiles(tagsUstensilesDisponible);
  }
  if (champUstensiles.value.length > 0) {
    
    let champValue = champUstensiles.value;
    let filtreTagsUst = [];
    recuperationTagUstDispo();
    for (let i = 0; i < tagsUstensilesDisponible.length; i++) {
      if (tagsUstensilesDisponible[i].includes(champValue)) {
        filtreTagsUst.push(tagsUstensilesDisponible[i]);
      }
    }
    affichageTagsUstensiles(filtreTagsUst);
  }
})



// affichage dynamique des recettes
function affichageRecette(recettes) {
  listeRecette.innerHTML = "";
  if (recettes.length == 0) {
    listeRecette.innerHTML += `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  }
  for (let i in recettes) {
    listeRecette.innerHTML += `
      <div class="carte_recette card">
        <div class="card-img-top"></div>
        <div class="card-body">
          <div class="carte_contenu">
            <div class="header_carte">
              <h2 class="card-title">${recettes[i].name}</h2>
              <div class="recette_duree">
                <img src="./images/temps_logo.png" alt="">
                <p>${recettes[i].time} min</p>
              </div>
            </div>
            <div class="recette_contenu">
              <div class="recette_ingredients">
                <ul class="recette_ingredients_liste">
                </ul>
              </div>
              <div class="recette">
                <p class="card-text">${recettes[i].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const recetteIngredientsListe = document.getElementsByClassName('recette_ingredients_liste')[i];
    for (let x in recettes[i].ingredients) {
      let ingredient = recettes[i].ingredients[x].ingredient+":";
      let quantity = recettes[i].ingredients[x].quantity;
      let unit = recettes[i].ingredients[x].unit;
      if (ingredient == undefined) {
        ingredient = "";
      }
      if ((quantity == undefined) && (unit == undefined)) {
        ingredient = recettes[i].ingredients[x].ingredient;
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




