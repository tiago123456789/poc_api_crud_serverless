const NotFoundException = require("../exceptions/notFoundException")

const products = [
    {
        "name": "Stack",
        "price": 10.0
    }
];

module.exports = {

    getAll() {
        return products
    },

    save(newProduct) {
        products.push(newProduct)
        return newProduct
    },

    update(id, modifiedData) {

        if (!products[id]) {
            throw new NotFoundException("Can't update register not found.")
        }

        products[id] = { ...products[id], ...modifiedData }
        return products[id];
    },

    delete(id) {
        if (!products[id]) {
            throw new NotFoundException("Can't delete register not found.")
        }

        delete products[id];
    }
}