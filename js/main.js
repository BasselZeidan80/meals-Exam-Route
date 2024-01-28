/// <reference types="../@types/jquery" />

// var validText = document.getElementById("valid");
// var invalidText = document.getElementById("invalid");
// var msg_Error = document.getElementById("msg-error");

// var arrList = [];

// if (localStorage.getItem("Users") != null) {
//   arrList = JSON.parse(localStorage.getItem("Users"));
// }
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
    
    
    <div class="col-lg-3 p-2 onclick="filterCat('${
      categoriesData[i].strCategory
    }')">
    <div class="card " id='catFilter'  >
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

  // let catFilter = document.getElementById("catFilter");
  // catFilter.addEventListener("click", function () {
  //   console.log("hiii");
  // });
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

async function filterCat(cateName) {
  const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateName}`;
  const response = await fetch(api);
  let finalRes = await response.json();
  console.log(finalRes);
  displayCat();
}

// ----------------------------------

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

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

let Contact = document.getElementById("Contact");

Contact.addEventListener("click", function () {
  heroSection.classList.add("d-none");
  console.log("hero none");
  categorySection.classList.add("d-none");
  SearchSection.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ingredientsSection.classList.add("d-none");
  contactSection.classList.remove("d-none");
});

document.getElementById("myForm").addEventListener("input", function () {
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var age = document.getElementById("age").value;
  var password = document.getElementById("password").value;
  var repassword = document.getElementById("repassword").value;

  var usernamePattern = /[A-Za-z0-9]+/;
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  var phonePattern = /\d{10}/;
  var agePattern = /^\d+$/;
  var passwordPattern = /.{6,}/;

  var isUsernameValid = usernamePattern.test(username);
  var isEmailValid = emailPattern.test(email);
  var isPhoneValid = phonePattern.test(phone);
  var isAgeValid = agePattern.test(age);
  var isPasswordValid = passwordPattern.test(password);
  var isRepasswordValid = repassword === password;

  var submitButton = document.getElementById("submitButton");
  submitButton.disabled = !(
    isUsernameValid &&
    isEmailValid &&
    isPhoneValid &&
    isAgeValid &&
    isPasswordValid &&
    isRepasswordValid
  );
  console.log("data is correct  ");
});

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
