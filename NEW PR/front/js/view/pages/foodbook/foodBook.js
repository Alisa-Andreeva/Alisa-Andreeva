import Component from "../../component.js";
import Receipt from "../../../model/receipt.js";

class FoodBook extends Component {
    constructor() {
        super();
        this.model = new Receipt();
    }

    getData() {
        return new Promise(resolve => this.model.getReceipts().then(receipts => resolve(receipts)));
    }

    render(receipts) {
        return new Promise(resolve => {
            resolve(
                ` 
                       <img class="content-container-imgHome" src="styles/img/img-fruit-bowl.webp" alt="foodBerry">
                       <div class="receipts">
                            <div class="receipts__additional">
                            <p class="receipts__counter"></p>
                            <button class="receipts__btn-clear button" ${!receipts.length ? 'disabled' : ''}>Clear Receipts List</button>   
                       </div>
                      <div class="receipt__list">${receipts.map(receipt => this.getReceiptsHTML(receipt)).join('\n ')}</div> `
            )
        })

    };

    getReceiptsHTML(meal) {
        return `
             <div data-id =${meal.idMeal} class="receipt__list-receipt">
                  <p data-id =${meal.idMeal} class="receipt-titleFood">${meal.strMeal}</p>
                  <img id="receipt-imageFood" data-id =${meal.idMeal} class="receipt-imageFood" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                   ${meal.strCategory ? `<p class="receipt-categoryFood">${meal.strCategory}</p>` : ""}
             <div class="receipt__buttons">
                   <a class="receipt__btn-edit button" href="#/receipt/${meal.idMeal}/edit">Edit</a>
                   <a class="receipt__btn-remove button">Remove</a>
                   <a class="receipt__btn-video button" href="${meal.strYoutube}" target="_blank">Youtube</a> 
              </div>   
</div>   
        `;
    }

    afterRender() {
        this.actionsReceipt();
    }

    actionsReceipt() {
        const receiptContainer = document.getElementsByClassName('receipts')[0],
            titleFood = document.getElementsByClassName('receipt-titleFood ')[0],
            imageFood = document.getElementById('receipt-imageFood'),
            receiptsBtnClear = document.getElementsByClassName('receipts__btn-clear')[0],
            receiptList = document.getElementsByClassName('receipt__list')[0];

        receiptContainer.addEventListener('click', event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('receipts__btn-clear'):
                    this.receiptsBtnClear(receiptList, receiptsBtnClear);
                    break;

                case targetClassList.contains('receipt'):
                case targetClassList.contains('receipt-imageFood'):
                    this.redirectToReceiptInfo(target.dataset.id);
                    break;

                case targetClassList.contains('receipt__btn-remove'):
                    this.removeReceipt(receiptList, target.parentNode.parentNode, receiptsBtnClear);
                    break;
            }
        });
    }

    receiptsBtnClear(receiptList, receiptsBtnClear) {
        if (confirm('Are you sure?')) {
            this.model.receiptsBtnClear().then(() => {
                receiptsBtnClear.disabled = true;
                receiptList.innerHTML = '';
            });
        }
    }

    redirectToReceiptInfo(idMeal) {
        location.hash = `#/receipt/${idMeal}`;
    }

    removeReceipt(receiptList, removeReceipt) {
        if (confirm('Are you sure?')) {
            this.model.removeReceipt(removeReceipt.dataset.id).then(() => {
                removeReceipt.remove();
            })
        }
    }
}

export default FoodBook