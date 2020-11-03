const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('file-system'),
    dbFilePath = 'receipts.json',
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/api/receipts', (req, res) => {
    res.send(getReceiptsFromDB());
});

app.post('/api/receipt', (req, res) => {
    const receiptsData = getReceiptsFromDB(),
        meal = req.body,
        receipt = receiptsData.find(receipt => receipt.idMeal === meal.idMeal);
    if (receipt != null) {
        res.sendStatus(422);
    } else {
        receiptsData.push(meal);
        setReceiptsToDB(receiptsData);
        res.send(meal);
    }
});

app.del('/api/receipts', (req, res) => {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));

    res.sendStatus(204);
})

app.get('/api/receipt/:idMeal', (req, res) => {
    const receiptsData = getReceiptsFromDB(),
        meal = receiptsData.find(meal => meal.idMeal === req.params.idMeal);

    meal ? res.send(meal) : res.send({});
});

app.put('/api/receipt/:idMeal', (req, res) => {
    const receiptsData = getReceiptsFromDB(),
        meal = receiptsData.find(meal => meal.idMeal === req.params.idMeal),
        editReceipt = req.body;

    meal.strCategory = editReceipt.strCategory;
    meal.strInstructions = editReceipt.strInstructions;
    meal.strMeal = editReceipt.strMeal;

    setReceiptsToDB(receiptsData);

    res.sendStatus(204);
});

app.del('/api/receipt/:idMeal', (req, res) => {
    const receiptsData = getReceiptsFromDB(),
        delReceipt = receiptsData.filter(receipt => receipt.idMeal !== req.params.idMeal);
    setReceiptsToDB(delReceipt);

    res.sendStatus(204);
});


function getReceiptsFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setReceiptsToDB(receiptsData) {
    fs.writeFileSync(dbFilePath, JSON.stringify(receiptsData));
}

app.listen(3000, () => console.log('Server has been started...'));