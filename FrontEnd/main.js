let token = localStorage.getItem("token");
let selectBtn; // Déclaration de la variable selectBtn
const darkBar = document.getElementById("darkBar");
const divFilters = document.querySelector(".btns-filtres");
const iconEl = document.querySelector(".portfolio__icon");
const logoutEl = document.querySelector(".login-logout a");
const gallery = document.querySelector(".gallery");

if (token) {
  darkBar.style.display = "block";
  divFilters.style.display = "none";
  iconEl.style.display = "block";
  logoutEl.textContent = "logout";
} else {
  darkBar.style.display = "none";
  divFilters.style.display = "block";
  iconEl.style.display = "none";
  logoutEl.textContent = "login";
}

// Récupération des projets de Sophie Bluel
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// Affichage des works dans le dom
async function displayWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Premier affichage de la page
displayWorks();

// Afficher les boutons filtres
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function displayCategoriesButton() {
  const categories = await getCategories();
  categories.unshift({ id: 0, name: "Tous" }); // Ajout du bouton "Tous"
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add("filtreBtn");
    if (category.id === 0) {
      btn.classList.add("active"); // Ajout de la classe active pour le bouton "Tous"
    }
    divFilters.appendChild(btn);
  });
}
displayCategoriesButton();

// Filtrer aux cliques les boutons par catégories
async function filterCategoryButton() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".btns-filtres button");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const btnId = event.target.id;
      gallery.innerHTML = "";

      // Supprimer la classe active de tous les boutons
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Ajouter la classe active au bouton cliqué
      event.target.classList.add("active");

      if (btnId !== "0") {
        const worksTriCategory = works.filter(
          (work) => work.categoryId === parseInt(btnId)
        );
        await displayFilteredWorks(worksTriCategory);
      } else {
        displayWorks();
      }
    });
  });
}

// Gestion de la classe active des boutons filtres
const btnsFiltres = document.querySelectorAll(".filtreBtn");

for (let i = 0; i < btnsFiltres.length; i++) {
  btnsFiltres[i].addEventListener("click", function () {
    // Supprimer la classe active de tous les boutons
    btnsFiltres.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Ajouter la classe active uniquement au bouton cliqué
    this.classList.add("active");

    // Filtrer en fonction du bouton cliqué
    filterCategoryButton();
  });
}

async function displayFilteredWorks(filteredWorks) {
  filteredWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

filterCategoryButton();
