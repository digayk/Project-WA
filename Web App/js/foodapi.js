const searchMeal = async (e) => {
    e.preventDefault();
    const text = document.querySelector(".uitleg__recept");
    const titel = document.querySelector(".titel");
    const afbeelding = document.querySelector("[data-modal] img");
    const ingredienten = document.querySelector(".uitleg__ingredienten");
    const invoer = document.getElementById("search__input");
    const grid = document.getElementById("grid__section");

    const infoMeal = (meal) => {
        const {strMeal, strMealThumb, strInstructions} = meal;

        const article = document.createElement("article");
        article.classList.add("recept");

        article.innerHTML = `
        <h3 class="titel">${strMeal}</h3>
        <img src="${strMealThumb}" alt="${strMeal}">
        <a href="#" class="view">Bekijken</a>
        `;
        
        article.querySelector(".view").addEventListener("click", (e) => {
            e.preventDefault();
            titel.textContent = strMeal;
            afbeelding.src = strMealThumb;
            text.textContent = strInstructions;
            document.getElementById("titel__modal").textContent = strMeal;
            document.querySelector('[data-modal]').showModal();
            let ingredientenLijst = "";


            for(let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
    
                if(ingredient && ingredient.trim()) {
                    ingredientenLijst += `<li>${measure ? measure : " "} ${ingredient}</li>`;
                }
            }
            ingredienten.innerHTML = ingredientenLijst;
        });

        

        grid.innerHTML = "";
        grid.appendChild(article);

    }

    const fetchMealDB = async (val) => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
        const {meals} = await response.json();
        return meals;

    }

    const val = invoer.value.trim()

    if(val) {
        const meals = await fetchMealDB(val)

        if(!meals) {
            alert("Bestaat niet!")
            return;
        }
        grid.innerHTML = "";
        meals.forEach(infoMeal)     
        
    }else{
        alert("Zoek een maaltijd op aub");
    }
}



const magnifier = document.querySelector(".fa-magnifying-glass");
magnifier.addEventListener("click", searchMeal);

document.getElementById("search__input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchMeal(e);
    }

});
