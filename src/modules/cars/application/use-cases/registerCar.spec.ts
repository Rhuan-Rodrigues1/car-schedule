import { describe, it, expect } from "vitest";
import { RegisterCar } from "../use-cases/registerCar";
import { InMemoryCarsRepository } from "../../infra/database/in-memory/in-memoryCarsRepository";


describe("Register Car", () => {
    it("should be able to register a car", async () => {
        const repository = new InMemoryCarsRepository();

        const registerCar = new RegisterCar(repository);

        await registerCar.execute({
            brand: "Toyota",
            model: "Corolla",
            plate: "ABC-1234"
        })

        expect(repository.cars).toHaveLength(1)
    })

    it("should not register a car with an existing plate", async () => {
        const repository = new InMemoryCarsRepository();

        const registerCar = new RegisterCar(repository);

        await registerCar.execute({
            brand: "Toyota",
            model: "Corolla",
            plate: "ABC-1234"
        })

        await expect(
            registerCar.execute({
            brand: "Toyota",
            model: "Hillux",
            plate: "ABC-1234"
        })
        ).rejects.toThrow("Car already exists")
    })
})