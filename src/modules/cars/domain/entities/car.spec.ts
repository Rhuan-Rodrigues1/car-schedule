import { describe, expect, it } from "vitest";
import { Car, ICar } from "./Car";


describe("Cars", () => {
    it("should be able to create a car", () => {
        const car = new Car({
            id: "1",
            brand: "Kwid",
            model: "Renaut",
            plate: "ABC-1234"
        })
        expect(car).toBeTruthy();
    })

    it("should not allow a car without a plate", () => {
        expect(() => {
                new Car({
            id: "1",
            brand: "Kwid",
            model: "Renaut",
            plate: ""
        })
        }).toThrow()
    })
})