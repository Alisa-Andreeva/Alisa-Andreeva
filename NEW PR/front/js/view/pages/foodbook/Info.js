import Component from "../../component.js";

import Receipt from "../../../model/receipt.js";
import Error404 from "../page404.js";


class Info extends Component {
    constructor() {
        super();
        this.model = new Receipt();
    }

    getData() {
        return new Promise(resolve => this.model.getReceipt(this.request.id).then(meal => resolve(meal)));
    }

    render(meal) {
        return new Promise(resolve => {
            let html;
            if (Object.keys(meal).length) {
                const {idMeal, strMealThumb, strMeal, strCategory, strInstructions} = meal,
                    ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    if (meal[`strIngredient${i}`]) {
                        ingredients.push(
                            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
                        );
                    } else break;
                }
                html = `
                <img class="content-container-imgHome" src="styles/img/img-fruit-bowl.webp" alt="foodBerry">
                <h1 class="info-pageTitle">Info about ${strMeal}</h1>
                <div data-id =${idMeal} class="receipt">
                     <h3 data-id =${idMeal} class="titleFood">${strMeal}</h3>
                     <img data-id =${idMeal} class="receipt-imageFood" src="${strMealThumb}" alt="${strMeal}" />
                     ${strCategory ? `<p class="categoryFood">${strCategory}</p>` : ""}
                     <p class="descriptionFood">${strInstructions}</p>
                     <h3 class="ingredientFoodTitle">Ingredients</h3>
                     <div class="ingredientFood">
                          ${ingredients.map((ing) => `<span class="ingredient">${ing}</span><br>`).join("")}
                     </div>
                     <div class="receipt__buttons">
                          <a class="receipt__btn-edit button   " href="#/receipt/${idMeal}/edit">Edit</a> 
                          <a class="edit-receipt__btn-back button" href="#/receipt">Back to Food Book</a>
                     </div>   
                </div>
                <div class="EdtMeal"></div>
                `

            } else {
                html = new Error404().render();
            }
            resolve(html);
        })
    };

}

export default Info
