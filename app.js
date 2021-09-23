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
const listeIngredient = document.getElementById('liste_ingredients');
const listeApperail = document.getElementById('liste_appareil');
const listeUstensiles = document.getElementById('liste_ustensiles');


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
dropdownsLogique(imgAppareil, listeApperail, champAppareil, rechercheApp);
dropdownsLogique(imgUstensiles, listeUstensiles, champUstensiles, rechercheUst);

function dropdownsLogique(img, liste, champ, recherche) {
  for (let i = 0; i < rechercheTags.length; i++) {
    img.addEventListener('click', function() {
      // fermeture du dropdown au clic sur la fleche
      if (liste.classList.contains('show') === true) {
        liste.classList.remove("show");
        img.setAttribute("src", "./images/menu_ferme.png");
        champ.style.borderRadius = "5px 5px 5px 5px"
        recherche.style.width = '170px';
        champ.blur();
      } else if (liste.classList.contains('show') === false) {
        // appelle de la fonction d'ouverture du dropdown
        overtureDropdown(champ, liste, img, recherche);
      }
    })
    
    champ.addEventListener('click', function() {
      if (liste.classList.contains('show') === false) {
        overtureDropdown(champ, liste, img, recherche);
      }
    })    
  }
}

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



