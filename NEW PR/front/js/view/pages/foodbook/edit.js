import Component from "../../component.js";
import Receipt from "../../../model/receipt.js";
import Error404 from "../page404.js";

class Edit extends Component {
    constructor() {
        super();

        this.model = new Receipt();
    }

    getData() {
        return new Promise(resolve => this.model.getReceipt(this.request.id).then(meal => {
            this.meal = meal;
            resolve(meal);
            console.log(meal);
        }));
    }

    render(meal) {
        return new Promise(resolve => {
            let html;

            if (this.editReceiptEnable()) {
                const {idMeal, strMealThumb, strMeal, strCategory, strInstructions} = meal,
                    ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    if (meal[`strIngredient${i}`]) {
                        ingredients.push(
                            `${meal[`strIngredient${i}`]} ${meal[`strMeasure${i}`]}`
                        )
                        console.log(ingredients);
                    } else break;
                }
                html = `
                <img class="content-container-imgHome" src="styles/img/img-fruit-bowl.webp" alt="foodBerry">
                <h1 class="edit-pageTitle">Edit Receipt</h1>
                <div data-id =${idMeal} class="edit-receipt">
                     <h3 data-id =${idMeal}><input  class="edit-titleFood" value="${strMeal}"></h3>
                     <img data-id =${idMeal} class="imageFood" src="${strMealThumb}" alt="${strMeal}" />
                     ${strCategory ? `<p><input class="edit-categoryFood" value="${strCategory}"></p>` : ""}
                     <textarea class="edit-descriptionFood">${strInstructions}</textarea>
                     <h3 class="ingredientFoodTitle">Ingredients</h3>
                     <ul class="edit-ingredientFood">
                         ${ingredients.map((el) => `<span class="ingredient">${el}</span><br>`).join("")}
                     </ul>
                     <div class="edit-receipt__buttons">
                         <button class="edit-receipt__btn-save button">Save Task</button>
                         <a class="edit-receipt__btn-back button" href="#/receipt/${idMeal}">Back Info</a> 
                         <a class="edit-receipt__btn-back button" href="#/receipt">Back to Food Book</a>
                      </div>   
                </div>
                `;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }

    afterRender() {
        this.editReceiptEnable() && this.setActions();
    }

    editReceiptEnable() {
        return Object.keys(this.meal).length;
    }

    setActions() {
        const editTitleFood = document.getElementsByClassName('edit-titleFood')[0],
            editCategoryFood = document.getElementsByClassName('edit-categoryFood')[0],
            editDescriptionFood = document.getElementsByClassName('edit-descriptionFood')[0],
            editIngredient = document.getElementsByClassName('edit-ingredient'),
            saveReceiptBtn = document.getElementsByClassName('edit-receipt__btn-save')[0];

        editTitleFood.addEventListener('keyup', () => saveReceiptBtn.disabled = !editTitleFood.value.trim());
        saveReceiptBtn.addEventListener('click', () => this.editReceipt(editCategoryFood, editDescriptionFood, editIngredient, editTitleFood));
    }

    editReceipt(editCategoryFood, editDescriptionFood, editIngredient, editTitleFood) {
        this.meal.strMeal = editTitleFood.value.trim();
        this.meal.strCategory = editCategoryFood.value.trim();
        this.meal.strInstructions = editDescriptionFood.value.trim();

        this.model.editReceipt(this.meal).then(() => this.redirectToInfoReceipt());
    }

    redirectToInfoReceipt() {
        location.hash = `#/receipt/${this.meal.idMeal}`;
    }

}

export default Edit;