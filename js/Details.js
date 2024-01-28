const searchParam = location.search;
const params = new URLSearchParams(searchParam);
params.get("id");

const id = params.get("id");
console.log(id);

let containerDetails = [];
async function getApiDetails() {
  const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(api);
  const finalRes = await response.json();
  console.log(finalRes.meals);
  containerDetails = finalRes.meals;
  displayData();
}
getApiDetails();

function displayData() {
  var cartona = "";

  for (let i = 0; i < containerDetails.length; i++) {
    cartona += `


<div class="image text-center bg-dark">
<img src="${containerDetails[i].strMealThumb}" class="w-100" alt="food">
<h1 class = "text-light">${containerDetails[i].strMeal}</h1>
</div>

<div class="mealDetails">
<h3>Instructions:</h3>
<p>${containerDetails[i].strInstructions}.

</p>

<div class="items">
    <ul class="fw-bold">
        <li class="fw-bold">Area : ${containerDetails[i].strArea}</li>
        <li class="fw-bold">Category :${containerDetails[i].strCategory}</li>

    </ul>
</div>

<div class="recipes">
    <h3>Recipes :</h3>
    <span class="cstSp">${containerDetails[i].strIngredient1}</span>
    <span class="cstSp">${containerDetails[i].strIngredient2}</span>
    <span class="cstSp">${containerDetails[i].strIngredient3} </span>
    <span class="cstSp">${containerDetails[i].strIngredient4}</span>
    <span class="cstSp">${containerDetails[i].strIngredient5}</span>
    <span class="cstSp"> ${containerDetails[i].strIngredient6}</span>
    <span class="cstSp">${containerDetails[i].strIngredient7}</span>
    <span class="cstSp">${containerDetails[i].strIngredient8}</span>
</div>

<div class="tags">
    <h2>Tags :
    </h2>
    <span>Meat</span>
    <span>Pie</span>
</div>

<div class="butons">
<a class="btn btn-success" href="${containerDetails[i].strSource}">Source</a>
<a class="btn btn-danger" href="${containerDetails[i].strYoutube}">Youtube</a>
</div>
</div>




`;
  }
  document.getElementById("rowDetails").innerHTML = cartona;
}
