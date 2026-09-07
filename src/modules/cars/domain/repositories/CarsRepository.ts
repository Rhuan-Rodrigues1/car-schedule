import { Car, ICar } from "../entities/Car";


export interface ICarRepository {
    create(car: ICar): Promise<any>;
    findById(id: string): Promise<Car | null>;
    findByPlate(plate: string): Promise<Car | null>;
}