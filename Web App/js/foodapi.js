let currentMeals = [];

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}


function showMealModal(meal) {
    const titel = document.querySelector(".titel");
    const afbeelding = document.querySelector("[data-modal] img");
    const ingredienten = document.querySelector(".uitleg__ingredienten");
    const text = document.querySelector(".uitleg__recept");

    titel.textContent = meal.strMeal;
    afbeelding.src = meal.strMealThumb;
    text.textContent = meal.strInstructions;
    document.getElementById("titel__modal").textContent = meal.strMeal;

    let ingredientenLijst = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredientenLijst += `<li>${measure || ""} ${ingredient}</li>`;
        }
    }
    ingredienten.innerHTML = ingredientenLijst;
    const favBtn = document.getElementById("favorieten__added");
    favBtn.onclick = function () {
        let favorites = JSON.parse(localStorage.getItem("favorieteMaaltijden")) || [];

        const bestaatAl = favorites.some(fav => fav.idMeal == meal.idMeal);
        if (!bestaatAl) {
            favorites.push(meal);
            localStorage.setItem("favorieteMaaltijden", JSON.stringify(favorites));
            alert(`${meal.strMeal} toegevoegd aan je favorieten! `)
        } else {
            alert(`${meal.strMeal} zit al in je favorieten! `)
        }
    }

    document.querySelector('[data-modal]').showModal();
}



const searchMeal = async (e) => {
    e.preventDefault();
    const invoer = document.getElementById("search__input");
    const grid = document.getElementById("grid__section");

    const infoMeal = (meal) => {
        const { strMeal, strMealThumb, strInstructions } = meal;

        const article = document.createElement("article");
        article.classList.add("recept");

        article.innerHTML = `
        <h3 class="titel">${strMeal}</h3>
        <img src="${strMealThumb}" alt="${strMeal}">
        <a href="#" class="view">Bekijken</a>
        `;

        article.querySelector(".view").addEventListener("click", (e) => {
            e.preventDefault();
            showMealModal(meal);
        });



        grid.appendChild(article);

    }

    const fetchMealDB = async (val) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
        const { meals } = await response.json();
        return meals;

    }

    const val = invoer.value.trim()

    if (val) {
        const meals = await fetchMealDB(val)

        if (!meals) {
            alert("Bestaat niet!")
            return;
        }
        grid.innerHTML = "";
        currentMeals = meals;
        displayMeals(currentMeals);
    } else {
        alert("Zoek een maaltijd op aub");
    }
}

const fetchCategory = async (category) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const { meals } = await response.json();
        if (!meals) {
            alert("Geen maaltijd gevonden voor deze categorie! ");
            return;
        }
        const grid = document.getElementById("grid__section");
        grid.innerHTML = "";


        currentMeals = meals;
        currentMeals.forEach(meal => {
            const { strMeal, strMealThumb, idMeal } = meal;

            const article = document.createElement("article");
            article.classList.add("recept");

            article.innerHTML = `
        <h3 class="titel">${strMeal}</h3>
        <img src="${strMealThumb}" alt="${strMeal}">
        <a href="#" class="view">Bekijken</a>
        `;

            article.querySelector(".view").addEventListener("click", async (e) => {
                e.preventDefault();
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();
                showMealModal(data.meals[0]);
            })
            grid.appendChild(article);
        })

    } catch (e) {
        console.error("Fout bij het ophalen van de categorie:", e);
    }
}


const fetchArea = async (area) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        const { meals } = await response.json();

        if (!meals) {
            alert("Geen gerechten gevonden voor deze keuken!");
            return;
        }
        const grid = document.getElementById("grid__section");
        grid.innerHTML = "";

        currentMeals = meals;
        meals.forEach(meal => {
            const { strMeal, strMealThumb, idMeal } = meal;

            const article = document.createElement("article");
            article.classList.add("recept");

            article.innerHTML = `
            <h3 class="titel">${strMeal}</h3>
            <img src="${strMealThumb}" alt="${strMeal}">
            <a href="#" class="view">Bekijken</a>
            `;

            article.querySelector(".view").addEventListener("click", async (e) => {
                e.preventDefault();
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();
                showMealModal(data.meals[0]);
            })
            grid.appendChild(article);
        })
    } catch (e) {
        console.error("Fout bij het ophalen van de keuken", e);
    }
}
const setupSorting = () => {
    const sortLinks = document.querySelectorAll("#recepten__section .dropdown__content a");

    for (let i = 0; i < sortLinks.length; i++) {
        sortLinks[i].addEventListener("click", async (e) => {
            e.preventDefault();
            const sortType = sortLinks[i].textContent.trim();

            if (!currentMeals || currentMeals.length == 0) {
                alert("Geen maaltijden om te sorteren. Zoek of selecteer eerst een categorie.");
                return;
            }

            let mealsToSort = [];
            for (let i = 0; i < currentMeals.length; i++) {
                mealsToSort.push(currentMeals[i]);
            }

            if (sortType == "Naam A-Z") {
                for (let j = 0; j < mealsToSort.length - 1; j++) {
                    for (let k = j + 1; k < mealsToSort.length; k++) {
                        if (mealsToSort[j].strMeal > mealsToSort[k].strMeal) {
                            const temp = mealsToSort[j];
                            mealsToSort[j] = mealsToSort[k];
                            mealsToSort[k] = temp;
                        }
                    }
                }
            }
            else if (sortType == "Naam Z-A") {
                for (let j = 0; j < mealsToSort.length - 1; j++) {
                    for (let k = j + 1; k < mealsToSort.length; k++) {
                        if (mealsToSort[j].strMeal < mealsToSort[k].strMeal) {
                            const temp = mealsToSort[j];
                            mealsToSort[j] = mealsToSort[k];
                            mealsToSort[k] = temp;
                        }
                    }
                }
            }
            else if (sortType == "Random") {
                for (let j = mealsToSort.length - 1; j > 0; j--) {
                    const k = Math.floor(Math.random() * (j + 1));
                    [mealsToSort[j], mealsToSort[k]] = [mealsToSort[k], mealsToSort[j]];
                }
            }



            displayMeals(mealsToSort);
        });
    }
}

const favorietenBtn = document.querySelector("#favorieten__button a");
const favorietenDialog = document.getElementById("favorieten__dialog");
const favorietenLijst = document.getElementById("favorieten__lijst");
const closeFavorieten = document.getElementById("close__favorieten");

favorietenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    favorietenLijst.innerHTML = "";
    let favorites = JSON.parse(localStorage.getItem("favorieteMaaltijden")) || [];

    if (favorites.length == 0) {
        favorietenLijst.innerHTML = "<p>Geen favorieten toegevoegd.</p>";
    } else {
        favorites.forEach(meal => {
            const div = document.createElement("div");
            div.classList.add("favoriet__item");
            div.innerHTML = `
            <h4>${meal.strMeal}</h4>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="btn__group">
            <a href="#" class="view__fav" data-id="${meal.idMeal}">Bekijken</a>
            <button class="delete__fav" data-id="${meal.idMeal}">
            <i class="fa-regular fa-trash-can"></i>
            </button>  
            </div> 
       `;
            favorietenLijst.appendChild(div);
        })
        document.querySelectorAll(".view__fav").forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                const meal = favorites.find(fav => fav.idMeal == id);
                if (meal) {
                    favorietenDialog.close();
                    showMealModal(meal);
                }
            });
        });
        document.querySelectorAll(".delete__fav").forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const id = button.getAttribute("data-id");
                favorites = favorites.filter(fav => fav.idMeal !== id);
                localStorage.setItem("favorieteMaaltijden", JSON.stringify(favorites));
                favorietenBtn.click();
            })
        })
    }
    favorietenDialog.showModal();
});
closeFavorieten.addEventListener("click", () => {
    favorietenDialog.close();
});

document.addEventListener("DOMContentLoaded", setupSorting);




const magnifier = document.querySelector(".fa-magnifying-glass");
magnifier.addEventListener("click", searchMeal);

document.getElementById("search__input").addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        searchMeal(e);
    }

});
document.querySelectorAll(".dropdown__content.categorie a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const category = link.textContent.trim();
        fetchCategory(category);
    });
});
document.querySelectorAll(".dropdown__content.keuken a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const area = link.textContent.trim();
        fetchArea(area);
    });
});
function displayMeals(meals) {
    const grid = document.getElementById("grid__section");
    grid.innerHTML = "";

    meals.forEach(meal => {
        const { strMeal, strMealThumb, idMeal } = meal;

        const article = document.createElement("article");
        article.classList.add("recept");

        article.innerHTML = `
            <h3 class="titel">${strMeal}</h3>
            <img src="${strMealThumb}" alt="${strMeal}">
            <a href="#" class="view">Bekijken</a>
        `;

        article.querySelector(".view").addEventListener("click", async (e) => {
            e.preventDefault();
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            showMealModal(data.meals[0]);
        });

        grid.appendChild(article);
    });
    console.log("Meals displayed: ", meals);
}
document.addEventListener("DOMContentLoaded", () => {
    fetchAllMeals();
});

function fetchAllMeals() {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals.length > 0) {
                const firstNine = data.meals.slice(0, 20);
                currentMeals = firstNine;
                displayMeals(firstNine);
            } else {
                console.warn("Geen recepten gevonden.");
            }
        })
        .catch(e => {
            console.error("Fout bij het ophalen van recepten:", e);
        });
}


async function fetchRandomMeals(count = 6) {
    const randomMeals = [];

    for (let i = 0; i < count; i++) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
            const data = await response.json();
            if (data.meals && data.meals.length > 0) {
                randomMeals.push(data.meals[0]);
            }
        } catch (e) {
            console.error("Fout bij het ophalen van willekeurige maaltijd:", e);
        }
    }

    currentMeals = randomMeals;
    displayMeals(randomMeals);
}

document.getElementById("random__button").addEventListener("click", () => {
    fetchRandomMeals();
});
