/// <reference types="../@types/jquery" />

var emailRegex = /^[a-zA-Z0-9]{3,30}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
var passRegex = /^[A-z0-9@#$_!-]{8,}$/;
var userRegex = /^[a-zA-Z0-9]{3,25}$/;

var validText = document.getElementById("valid");
var invalidText = document.getElementById("invalid");
var msg_Error = document.getElementById("msg-error");

var arrList = [];

if (localStorage.getItem("Users") != null) {
  arrList = JSON.parse(localStorage.getItem("Users"));
}
//-------------- menu Aria---------------------------

let menuIcon = document.getElementById("menuIcon");
let liMenu = document.querySelectorAll(".liMenu");

$(".side-bar").hide(300);
$(liMenu).hide(300);

$(menuIcon).on("click", () => {
  $(".side-bar").animate({ width: "toggle", paddingInline: "toggle" }, 500);
  $(liMenu).slideToggle(900);
});

// -------------------------------------------
let meals = [];

async function getApi(mealName) {
  let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  let response = await fetch(api);
  let finalResponse = await response.json();
  meals = finalResponse.meals;

  console.log(meals);
  displayMeals();
  return meals;
}
getApi("beef");

function displayMeals() {
  var cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += `
    
    
    <div class="col-lg-3 p-2">
    <div class="card" onclick= showDetails(${meals[i].idMeal})>
        <img src="${meals[i].strMealThumb}" class="w-100" alt="Food">
        <div class="layer p-2">

            <h5 class=" fs-3 fw-bold">${meals[i].strMeal}</h5>
        </div>
    </div>
</div>

    `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

// search button

let searchItem = document.getElementById("searchBtn");
let heroSection = document.getElementById("heroSection");
let SearchSection = document.getElementById("SearchSection");

let searchInputName = document.getElementById("searchInputName");

async function searchByName() {
  var term = searchInputName.value;
  console.log(term);
  await getApi(term);

  var cartona = "";
  for (let i = 0; i < meals.length; i++) {
    if (meals[i].strMeal.toLowerCase().includes(term.toLowerCase()) == true) {
      cartona += `

      <div class="col-lg-3 p-2">
      <div class="card" onclick= showDetails(${meals[i].idMeal})>
          <img src="${meals[i].strMealThumb}" class="w-100" alt="Food">
          <div class="layer p-2">

              <h5 class=" fs-3 fw-bold">${meals[i].strMeal}</h5>
          </div>
      </div>
  </div>

          `;
      console.log("true");
    }
  }
  document.getElementById("rowDataE").innerHTML = cartona;
  // displayMeals();
}

searchItem.addEventListener("click", function () {
  heroSection.classList.add("d-none");
  console.log("hero none");
  SearchSection.classList.remove("d-none");
  console.log("SearchSection appeared");
  categorySection.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ingredientsSection.classList.add("d-none");
  contactSection.classList.add("d-none");
});

const Home = document.getElementById("Home");

Home.addEventListener("click", function () {
  SearchSection.classList.add("d-none");
  heroSection.classList.remove("d-none");
  categorySection.classList.add("d-none");
  AreaSection.classList.add("d-none");
  contactSection.classList.add("d-none");
  console.log("heroSectionAppeared");
});

// ------------ Categories section------------
// -----------------------NEW edit category filter---------------------------
async function filterCat(meal) {
  const api = `www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`;
  const response = await fetch(api);
  let finalRes = await response.json();
  console.log(finalRes);
}

// ---------------------------------

let categoriesData = [];
async function getCategoryApi() {
  const api = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  let res = await fetch(api);
  let finalRes = await res.json();
  categoriesData = finalRes.categories;
  console.log(categoriesData);
  displayCat();
}

function displayCat() {
  var conatin = "";

  for (let i = 0; i < categoriesData.length; i++) {
    conatin += `
    
    
    <div class="col-lg-3 p-2">
    <div class="card "   >
        <img src="${
          categoriesData[i].strCategoryThumb
        }" class="w-100" alt="Food">
        <div class="layer p-2" >

            <h5 class=" fs-3 fw-bold">${categoriesData[i].strCategory}</h5>
            <p>${categoriesData[i].strCategoryDescription.slice(0, 80)}</p>
        </div>
    </div>
</div>

    `;
  }
  document.getElementById("rowDataC").innerHTML = conatin;
}

const Categories = document.getElementById("Categories");
const categorySection = document.getElementById("categorySection");

Categories.addEventListener("click", function () {
  heroSection.classList.add("d-none");
  console.log("hero none");
  SearchSection.classList.add("d-none");
  categorySection.classList.remove("d-none");
  AreaSection.classList.add("d-none");
  console.log("categorySection appeared");
  ingredientsSection.classList.add("d-none");
  contactSection.classList.add("d-none");
  getCategoryApi();
});

// ----------------------------------

// ---------------------Aria-----------------
const Area = document.getElementById("Area");
const AreaSection = document.getElementById("AreaSection");
Area.addEventListener("click", function () {
  heroSection.classList.add("d-none");
  console.log("hero none");
  categorySection.classList.add("d-none");
  AreaSection.classList.remove("d-none");
  console.log("AreaSection appeared");
  SearchSection.classList.add("d-none");
  ingredientsSection.classList.add("d-none");
  contactSection.classList.add("d-none");
  getAreaApi();
});

let AreaData = [];

async function getAreaApi() {
  const api = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
  let res = await fetch(api);
  let finalRes = await res.json();
  AreaData = finalRes.meals;
  console.log(AreaData);
  displayArea();
}

function displayArea() {
  var conatiner = "";

  for (let i = 0; i < AreaData.length; i++) {
    conatiner += `
    
    
    <div class="col-lg-3 p-2">
    <div class="card">
        <img src="images/images.png" class="w-100" alt="Food">
        <div class="layer p-2">

            <h5 class=" fs-2 fw-bold text-danger">${AreaData[i].strArea}</h5>
          
        </div>
    </div>
</div>

    `;
  }
  document.getElementById("rowDataA").innerHTML = conatiner;
}
// --------------------- End Aria-----------------

//  ------------Start section ingredients------------------

const ingredientsSection = document.getElementById("ingredientsSection");
const Ingredients = document.getElementById("Ingredients");

Ingredients.addEventListener("click", function () {
  handleLoadScreen();

  heroSection.classList.add("d-none");
  console.log("hero none");
  categorySection.classList.add("d-none");
  SearchSection.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ingredientsSection.classList.remove("d-none");
  contactSection.classList.add("d-none");
  getIngredientsApi();
});

let ingData = [];

async function getIngredientsApi() {
  const api = `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
  let res = await fetch(api);
  let finalRes = await res.json();
  ingData = finalRes.meals;
  console.log(ingData);
  displayIngredients();
}

function displayIngredients() {
  var conatiner = "";

  for (let i = 0; i < ingData.length; i++) {
    if (ingData[i].strDescription != null) {
      conatiner += `
      
      
      <div class="col-lg-3 p-2">
      <div class="card">
          <img src="images/meal.jpg" class="w-100" alt="Food">
          <div class="layeree  text-center text-dark p-2 ">
  
              <h3 class=" fs-3 fw-bold ">${ingData[i].strIngredient}</h3>
              <p>${ingData[i].strDescription}</p>
          </div>
      </div>
  </div>
  
      `;
    }
  }
  document.getElementById("rowDataI").innerHTML = conatiner;
}

//  ------------End section ingredients------------------

// -------------------------
// -------------------------
// -------------------------
// -------------------------

// let mealsData = []; // Your meal data, fetched from API or elsewhere

// // Simulating fetching data (replace with your API call)
// function fetchMealsData() {
//   // Replace this with your API call
//   mealsData = [
//     {
//       id: 1,
//       name: "Meal 1",
//       description: "Description 1",
//       ingredients: ["Ingredient 1", "Ingredient 2"],
//     },
//     {
//       id: 2,
//       name: "Meal 2",
//       description: "Description 2",
//       ingredients: ["Ingredient 3", "Ingredient 4"],
//     },
//     // ... add more meals
//   ];

//   displayMeals();
// }

// function displayMeals() {
//   const mealContainer = document.getElementById("meal-container");
//   mealContainer.innerHTML = "";

//   mealsData.forEach((meal) => {
//     const mealCard = document.createElement("div");
//     mealCard.className = "meal-card";
//     mealCard.textContent = meal.name;

//     mealCard.addEventListener("click", () => {
//       displayMealDetails(meal);
//     });

//     mealContainer.appendChild(mealCard);
//   });
// }

// function displayMealDetails(meal) {
//   const mealDetailsContainer = document.getElementById("meal-details");
//   mealDetailsContainer.innerHTML = "";

//   const mealName = document.createElement("h2");
//   mealName.textContent = meal.name;

//   const mealDescription = document.createElement("p");
//   mealDescription.textContent = meal.description;

//   const ingredientsTitle = document.createElement("h3");
//   ingredientsTitle.textContent = "Ingredients";

//   const ingredientsList = document.createElement("ul");
//   meal.ingredients.forEach((ingredient) => {
//     const ingredientItem = document.createElement("li");
//     ingredientItem.textContent = ingredient;
//     ingredientsList.appendChild(ingredientItem);
//   });

//   mealDetailsContainer.appendChild(mealName);
//   mealDetailsContainer.appendChild(mealDescription);
//   mealDetailsContainer.appendChild(ingredientsTitle);
//   mealDetailsContainer.appendChild(ingredientsList);
// }

// // Initial data fetch and display
// fetchMealsData();

// ----------------------Contacts-------------------

let Contact = document.getElementById("Contact");

let contactSection = document.getElementById("contactSection");
let inpName = document.getElementById("inpName");
let inpEmail = document.getElementById("inpEmail");
let inpPhone = document.getElementById("inpPhone");
let inpAge = document.getElementById("inpAge");
let inpPassword = document.getElementById("inpPassword");
let inpRePassword = document.getElementById("inpRePassword");

function clearForm() {
  inpName.value = "";
  inpEmail.value = "";
  inpPhone.value = "";
  inpAge.value = "";
  inpPassword.value = "";
  inpRePassword.value = "";
}

function validationUser() {
  var msgErr = document.getElementById("msgErr");
  var user = userName.value;

  if (userRegex.test(user) == true) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");
    msgErr.classList.add("d-none");
  } else {
    msgErr.classList.remove("d-none");

    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
  }
  clearValidation();
}

Contact.addEventListener("click", function () {
  heroSection.classList.add("d-none");
  console.log("hero none");
  categorySection.classList.add("d-none");
  SearchSection.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ingredientsSection.classList.add("d-none");
  contactSection.classList.remove("d-none");
});

let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
  console.log("hii contacts");

  var contacts = {
    name: inpName.value,
    email: inpEmail.value,
    phone: inpPhone.value,
    age: inpAge.value,
    password: inpPassword.value,
    rePassword: inpRePassword.value,
  };
  console.log(contacts);

  if (ValidationInputs() == true) {
    if (arrList.length == 0) {
      arrList.push(contacts);
      localStorage.setItem("Users", JSON.stringify(arrList));
    } else {
      var exist = false;
      for (var i = 0; i < arrList.length; i++) {
        // console.log(arrList[i].email, email.value);

        if (arrList[i].email == inpEmail.value) {
          // alert("exist");
          console.log("exist");

          exist = true;
          break;
        }
      }
      if (exist) {
        msg_Error.classList.remove("d-none");
        validText.classList.add("d-none");
      } else {
        arrList.push(contacts);
        localStorage.setItem("Users", JSON.stringify(arrList));
        console.log("pushed");
      }
    }
  }

  clearForm();
});

function clearValidation() {
  var msgErr = document.getElementById("msgErr");
  var msgErrEmail = document.getElementById("msgErrEmail");

  var user = userName.value;

  var EEmail = email.value;

  if (user.length == 0) {
    msgErr.classList.add("d-none");
  }

  if (EEmail.length == 0) {
    msgErrEmail.classList.add("d-none");
  }
}

function validationEmail() {
  var EEmail = inpEmail.value;
  var msgErrEmail = document.getElementById("msgErrEmail");
  if (emailRegex.test(EEmail) == true) {
    msgErrEmail.classList.add("d-none");
  } else {
    msgErrEmail.classList.remove("d-none");
  }
  clearValidation();
}
////////////////////Validation/////////

////////////////////End Validation/////////
function ValidationInputs() {
  if (
    emailRegex.test(inpEmail.value) == true &&
    passRegex.test(inpPassword.value) == true &&
    userRegex.test(inpName.value) == true
  ) {
    console.log("hello", inpName.value);
    validText.classList.remove("d-none");
    invalidText.classList.add("d-none");
    return true;
  } else {
    invalidText.classList.remove("d-none");
    validText.classList.add("d-none");
    return false;
  }
}

// ----------------------End Contacts-------------------

// ----------------------------Loader---------------

function handleLoadScreen() {
  $(function () {
    $(".loader").fadeOut(400, function () {
      $(".loading").slideUp(1000, function () {
        $("body").css("overflow", "auto");
        $(".loading").remove();
      });
    });
  });
}

handleLoadScreen();
// ----------------------------End Loader---------------

function showDetails(id) {
  location.href = `./Details.html?id=${id}`;
}
