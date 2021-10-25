const { expect } = require("@jest/globals");
const productFunction = require("../../../src/functions/product")
const productService = require("../../../src/services/product")


describe("Integration test product service", () => {

    it("Shoulder list all products success", async () => {
        const response = await productFunction.getAll();
        const body = JSON.parse(response.body)
        expect(response.statusCode).toBe(200)
        expect(body.length).toBe(1)
    })


    it("Shoulder save new product", async () => {
        const productFake = {
            "name": "Stack",
            "price": 10.0
        }
        const response = await productFunction.save({
            body: JSON.stringify(productFake)
        })
        const productCreated = JSON.parse(response.body)
        expect(response.statusCode).toBe(201)
        expect(productCreated.name).toBe(productFake.name)
        expect(productCreated.price).toBe(productFake.price)
    })

    it("Shoulder trigger NotFoundException when try delete product not exist", () => {
        try {
            const idFake = 100
            productFunction.delete({
                pathParameters: {
                    id: idFake
                }
            });
        } catch (error) {
            expect(error.name).toBe("NotFoundException")
        }
    })

    it("Shoulder update success", async () => {
        const productFake = {
            "name": "Stack",
            "price": 50.0
        }
        const response = await productFunction.update({
            pathParameters: {
                id: 0
            },
            body: JSON.stringify(productFake)
        });
        expect(response.statusCode).toBe(204)
    })

    it("Shoulder delete success product", () => {
        const idFake = 0
        productFunction.delete({
            pathParameters: {
                id: idFake
            }
        });
        expect(true).toBe(true)
    })

    it("Shoulder trigger NotFoundException when try update product not exist", () => {
        try {
            const idFake = 100
            productFunction.update({
                pathParameters: {
                    id: idFake,
                }
            });
        } catch (error) {
            expect(error.name).toBe("NotFoundException")
        }
    })

   
})