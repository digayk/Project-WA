let currentMeals = [];

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
            let ingredientenLijst = "";


            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim()) {
                    ingredientenLijst += `<li>${measure ? measure : " "} ${ingredient}</li>`;
                }
            }
            ingredienten.innerHTML = ingredientenLijst;
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
            
            if (!currentMeals || currentMeals.length === 0) {
                alert("Geen maaltijden om te sorteren. Zoek of selecteer eerst een categorie.");
                return;
            }

            let mealsToSort = [];
            for (let i = 0; i < currentMeals.length; i++) {
                mealsToSort.push(currentMeals[i]);
            }
            
            if (sortType === "Naam A-Z") {
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
            else if (sortType === "Naam Z-A") {
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
            else if (sortType === "Random") {
                const randomMeals = [];
            
                for (let i = 0; i < 6; i++) {
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
            
                displayMeals(randomMeals);
                return;
            }
            
            
            displayMeals(mealsToSort);
        });
    }
}

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
                    const firstNine = data.meals.slice(0, 9);
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
    