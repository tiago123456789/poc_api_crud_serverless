'use strict';

const productService = require("../services/product")

const handlerExceptions = (error) => {
    switch(error.name) {
        case "NotFoundException":
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: error.message
                })
            }
        default:
            console.log(error)
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Internal server error"
                })
            }

    }
}

module.exports.getAll = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(productService.getAll()),
    };
};


module.exports.save = async (event) => {
    const newProduct = JSON.parse(event.body)
    return {
        statusCode: 201,
        body: JSON.stringify(productService.save(newProduct)),
    };
};

module.exports.delete = async (event) => {
    try {
        const id = event.pathParameters.id
        productService.delete(id);
    
        return {
            statusCode: 204
        };
    } catch(error) {
        return handlerExceptions(error)
    }
};

module.exports.update = async (event) => {
    try {
        const id = event.pathParameters.id
        const modifiedData = JSON.parse(event.body)
        productService.update(id, modifiedData)
    
        return {
            statusCode: 200,
            body: JSON.stringify(products[id]),
        };
    } catch(error) {
        return handlerExceptions(error)
    }
   
}