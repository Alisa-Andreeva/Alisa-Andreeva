class Receipt {
    getReceipts() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/receipts');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();

        })
    }

    SaveReceipt(meal) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3000/api/receipt');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                    alert('The recipe is saved in the Food book')
                } else {
                    console.error(xhr.responseText);
                    alert('Look carefully!\n' +
                        'This recipe is already available')
                }
            };

            xhr.send(JSON.stringify(meal));
        });

    }

    receiptsBtnClear() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('DELETE', 'http://localhost:3000/api/receipts');

            xhr.onload = () => resolve();

            xhr.send();
        })
    }

    getReceipt(idMeal) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `http://localhost:3000/api/receipt/${idMeal}`);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    editReceipt(editReceipt) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', `http://localhost:3000/api/receipt/${editReceipt.idMeal}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(editReceipt));

        });
    }

    removeReceipt(id) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('DELETE', `http://localhost:3000/api/receipt/${id}`);

            xhr.onload = () => resolve();

            xhr.send();
        });
    }
}

export default Receipt;