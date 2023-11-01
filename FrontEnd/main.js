const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const gallery = projets[i];
    // Récupération de l'élément du DOM qui accueillera les photos
    const divGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = gallery.imageUrl;

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = gallery.title;

    // On rattache la balise à la div gallery
    divGallery?.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(nomElement);
  }
}

// Premier affichage de la page
genererProjets(projets);

const boutonfilterAll = document.querySelector(".filter-id-1");
// console.log(boutonfilterAll);
boutonfilterAll?.addEventListener("click", function () {
  //
  const allProjects = projets.filter(function (all) {
    return all;
  });
  // console.log(allProjects);
  // Effacement de l'écran et regénération de la page
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(allProjects);
});

const boutonfilterObject = document.querySelector(".filter-id-2");
boutonfilterObject?.addEventListener("click", function () {
  const objectFilters = projets.filter(function (object) {
    return object.category.name === "Objets";
  });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(objectFilters);
});

const boutonfilterApartment = document.querySelector(".filter-id-3");
//console.log(boutonfilterApartment);
boutonfilterApartment?.addEventListener("click", function () {
  const apartmentsFilters = projets.filter(function (apartment) {
    return apartment.category.name === "Appartements";
  });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(apartmentsFilters);
  apartmentsFilters;
});

const boutonfilterHotelsAndRestaurants = document.querySelector(".filter-id-4");
boutonfilterHotelsAndRestaurants?.addEventListener("click", function () {
  const hotelsAndRestaurantsFilters = projets.filter(function (
    hotelsAndRestaurants
  ) {
    return hotelsAndRestaurants.category.name === "Hotels & restaurants";
  });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(hotelsAndRestaurantsFilters);
});
