const db = require("../models");
const items = [
    {
        product_name: "FallOut 76",
        department_name: "Video Games",
        price: 59.99,
        stock_quantity: 125
    },
    {
        product_name: "Macks Earplugs",
        department_name: "Home Goods",
        price: 4.99,
        stock_quantity: 45
    },
    {
        product_name: "Organic Dried Basil",
        department_name: "Grocery",
        price: 7.99,
        stock_quantity: 16
    },
    {
        product_name: "Dishonored: Death of the Outsider",
        department_name: "Video Games",
        price: 59.99,
        stock_quantity: 75
    },
    {
        product_name: "Saffron 0.05 oz",
        department_name: "Grocery",
        price: 19.99,
        stock_quantity: 8
    },
    {
        product_name: "World's Best Cat Litter",
        department_name: "Pet Supplies",
        price: 22.99,
        stock_quantity: 60
    },
    {
        product_name: "Citrus Magic All-Purpose Cleaner",
        department_name: "Home Goods",
        price: 5.99,
        stock_quantity: 125
    },
    {
        product_name: "The Elder Scrolls V: Skyrim",
        department_name: "Video Games",
        price: 69.99,
        stock_quantity: 30
    },
    {
        product_name: "NaturVet Dog Multivitamin",
        department_name: "Pet Supplies",
        price: 17.71,
        stock_quantity: 32
    },
    {
        product_name: "LitterMaid Disposable Litter Box 3 pack",
        department_name: "Pet Supplies",
        price: 7.61,
        stock_quantity: 8
    }
];

db.sequelize.sync({force: true}).then(function(){
    db.Product.bulkCreate(items).then(function(rows) {
        console.log('\n\nINSERT\n\n');
    }).catch(function(err) {
        console.log('\n\nError: ', err);
    });
});