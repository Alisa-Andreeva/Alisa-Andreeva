import Component from "../../component.js";
import Receipt from "../../../model/receipt.js";

class Search extends Component {
    constructor() {
        super();
        this.model = new Receipt()
    }

    getData() {
        return new Promise(resolve => resolve());
    }

    render() {
        return new Promise(resolve => {
            resolve(`
            <img class="content-container-imgHome" src="styles/img/img-fruit-bowl.webp" alt="foodBerry">
            <img class="content-container-imgHome-left" src="styles/img/strawberry-grain.webp" alt="foodBerry">
            <div class="app">
                <form class="search">
                <input class="search__inp" type="text" placeholder="Enter meal or food">
                <input class="button" type="button" value="Search">
                <button class="button">Random</button>
                </form>
                
                <div class="result"></div>
                <div class="meals"></div>
                <div class="meal"></div>
            </div>`);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const form = document.querySelector('form'),
            input = document.querySelector('input[type="text"]'),
            button = document.querySelector('button'),
            buttonSearch = document.querySelector('.button'),
            result = document.querySelector('.result'),
            meals = document.querySelector('.meals'),
            mealBox = document.querySelector('.meal');

        button.addEventListener("click", () => this.getRandom(meals, result, mealBox));
        buttonSearch.addEventListener('click', () => this.search(mealBox, input, result, meals));
    }

    search(mealBox, input, result, meals) {

        mealBox.innerHTML = "";

        const text = input.value;

        if (text.trim()) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
                .then((res) => res.json())
                .then((data) => {
                    result.innerHTML = `<h3 class="titleFood"><b>${text}</b></h3>`;
                    if (data.meals === null) {
                        result.innerHTML = `<p>There's no such meal</p>`;
                    } else {
                        meals.innerHTML = data.meals
                            .map((meal) => `
                        <div class="searchfood" data-id="${meal.idMeal}">
                            <img class="receipt-imageFood" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="receipt-titleFood"><b>${meal.strMeal}</b></div>
                        </div>
                    `
                            )
                            .join("");
                    }
                });
            input.value = "";
        } else return;
        meals.addEventListener("click", (e) => {
            if (e.target.parentNode.dataset.id) {
                const id = +e.target.parentNode.dataset.id;
                this.getMeal(id, mealBox);
            }
        });
    }

    getMeal(id, mealBox) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.json())
            .then((data) => {
                const meal = data.meals[0];
                this.addMeal(meal, mealBox);
            });
    }


    getRandom(meals, result, mealBox) {
        meals.innerHTML = "";
        result.innerHTML = "";

        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            .then((res) => res.json())
            .then((data) => {
                const meal = data.meals[0];
                this.addMeal(meal, mealBox, meals);
            });
    }

    addMeal(meal, mealBox) {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(
                    `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                );
            } else break;
        }

        mealBox.innerHTML = `
        <h3 class="titleFood"><b>${meal.strMeal}</b></h3>
        <img class="receipt-imageFood" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        ${meal.strCategory ? `<p class="categoryFood">${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p class="countryFood">${meal.strArea}</p>` : ""}
        <p class="descriptionFood">${meal.strInstructions}</p>
        <h3 class="ingredientFoodTitle">Ingredients</h3>
        <div class="ingredientFood">
            ${ingredients.map((ing) => `<span class="ingredient">${ing}</span><br>`).join("")}
        </div>
        <button class="receipt-add__btn-add button">Save Receipt</button>

    `;
        const addReceiptBtn = document.getElementsByClassName('receipt-add__btn-add')[0];

        addReceiptBtn.addEventListener('click', () => this.saveReceipt(meal));
    }

    saveReceipt(meal) {
        let rec = new Receipt();
        alert('Your recipe is saved ... you should wait for my answer')
        rec.SaveReceipt(meal);
        this.redirectToFood();
    }

    redirectToFood() {
        location.hash = `#/receipt`;
    }

}

export default Search;