const { expect } = require("@jest/globals");
const productService = require("../../../src/services/product")

describe("Unit test product service", () => {

    it("Shoulder list all products", () => {
        const products = productService.getAll();
        expect(products.length).toBe(1)
    })


    it("Shoulder save new product", () => {
        const productFake = {
            "name": "Stack",
            "price": 10.0
        }
        const productReturned = productService.save(productFake);
        expect(productReturned.name).toBe(productFake.name)
        expect(productReturned.price).toBe(productFake.price)
    })

    it("Shoulder trigger NotFoundException when try delete product not exist", () => {
        try {
            const idFake = 1
            productService.delete(idFake);
        } catch (error) {
            expect(error.name).toBe("NotFoundException")
        }
    })

    it("Shoulder delete success product", () => {
        const productFake = {
            "name": "Stack",
            "price": 10.0
        }
        const idFake = 0
        productService.save(productFake);
        productService.delete(idFake);
        expect(true).toBe(true)
    })

    it("Shoulder trigger NotFoundException when try update product not exist", () => {
        try {
            const idFake = 100
            productService.update(idFake, {});
        } catch (error) {
            expect(error.name).toBe("NotFoundException")
        }
    })

    it("Shoulder update success", () => {
        const productFake = {
            "name": "Stack",
            "price": 50.0
        }
        const idExist = (productService.getAll().length - 1)
        const productReturned = productService.update(idExist, productFake);
        expect(productReturned.name).toBe(productFake.name)
        expect(productReturned.price).toBe(productFake.price)
    })
})