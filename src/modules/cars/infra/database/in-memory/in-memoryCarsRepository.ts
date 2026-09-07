import { Car, ICar } from "../../../domain/entities/Car";
import { ICarRepository } from "../../../domain/repositories/CarsRepository";


export class InMemoryCarsRepository implements ICarRepository {
    public cars: Car[] = []

    async create(car: ICar): Promise<any> {
        const carObj = new Car(car)
        this.cars.push(carObj)
    }

    async findById(id: string): Promise<Car | null> {
        const car = this.cars.find((car) => car.id === id)
        
        return car ?? null;
    }

    async findByPlate(plate: string): Promise<Car | null> {
        const car = this.cars.find((car) => car.plate === plate)

        return car ?? null
    }
}     