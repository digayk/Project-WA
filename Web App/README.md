# Project WA
 Project Web Advanced
Project-bescrhrijving:
Snack Tracker is een interactieve single-page applicatie waarmee gebruikers recepten kunnen ontdekken, filteren, sorteren en bewaren. De app gebruikt TheMealDB API om maaltijdgegevens op te halen en weer te geven.

##Functionaliteiten: 
- Recepten verkennen: Zoek en bekijk recepten met details
- Filteren/sorteren: Op categorie, keuken of naam
- Favorieten: Opslaan van favoriete recepten (localStorage)
- Dark mode: Oogvriendelijke nachtmodus
- Responsive design: Werkt op alle apparaatformaten

##Screenshots

![homepage] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/screen%201.png?raw=true) 
![dropdown] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/screen%202.png?raw=true)
![darkmode] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/screen%203.png?raw=true)
![dialog] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/screen%204.png?raw=true)
![favorites] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/screen%20%25.png?raw=true)
![responsive] (https://github.com/digayk/Project-WA/blob/main/Web%20App/screenshots/next%20screen.png?raw=true)


1. DOM Manipulatie
Selectie van elemnten via selectoren...  
document.querySelector('[data-modal]')
document.getElementById('search__input')

Dynamische elementen

grid.innerHTML = ''; 
article.innerHTML = `<h3>${strMeal}</h3>...`;

Event listeners

viewLinks.forEach(link => link.addEventListener('click', showModal))

2. Modern Javascript

Async bv bij foodapi.js heb ik async function fetchMealDB().
Template liberals bij foodapi.js. Met <h3>${strMeal}</h3>.
Arrow functions bij modal.js met () => modal.close().
Array methods bij foodapi.js met .forEach(), .some().

3. Data & API
Endpoints van API
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)

4. Opslag & validatie
LocalStorage
localStorage.setItem("favorieteMaaltijden", JSON.stringify(favorites))
Form validatie
if (!val) alert("Zoek een maaltijd op aub");

5. Styling & layout
CSS Variabelen
:root {
    --primary-color: #FF4040;      
    --secondary-color: #ff9c0c;     
    --light-bg: #FFF5E0;            
    --dark-bg: #111;                
    --text-light: #fff;            
    --text-dark: #333;             
    --border-color: #8D6E63;
  }
  Bij general.css, ook heb ik daar de rem notatie geïmplementeerd
  Responsive gedeelte
  @media (max-width: 700px) {
  .recept { flex: 0 0 40%; }
}

6. Tooling & structuur
- Project is opgezet met Vite en gebruikt dus zijn structuur. 
Er zijn folders voorzien voor CSS en Javascript, html niet aangezien dit een single-page toepassing is vond ik er het nut niet voor.

API keuze is food api, dit komt omdat ik zo'n website gebruikelijk zou vinden mocht ik iets willen koken.

**Honorable mentions

Voor mijn dark mode toggle ben ik mij gebaseerd op de code in: https://codepen.io/Umer_Farooq/pen/eYJgKGN.
Voor mijn iconen gebruik ik fontawesome.


https://chatgpt.com/share/6818c120-7978-8005-9745-e1372ec97896
CHATGPT LINK VOOR HET LEREN OVER MODALS
https://www.youtube.com/watch?v=ywtkJkxJsdg
LINK VIDEO VOOR MODALS

https://chatgpt.com/share/681b1fe9-2e28-8005-bf90-e480bca65808
CHATGPT LINK VOOR <br> NA NUMERATIES
