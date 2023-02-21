const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
	index: (req, res) => {

		let productsInSale = products.filter(product => product.category === "in-sale");
		let productsVisited = products.filter(product => product.category === "visited");

		res.render("index",{
			productsVisited,
			productsInSale,
			toThousand
        })
    },
};