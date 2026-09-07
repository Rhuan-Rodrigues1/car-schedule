import { Car } from "../../../cars/domain/entities/Car";
import { ICarRepository } from "../../../cars/domain/repositories/CarsRepository";
import { v4 as uuidv4 } from "uuid";


interface RegisterCarRequest {
    brand: string,
    model: string,
    plate: string
}


export class RegisterCar {
    constructor(private readonly carsRepository: ICarRepository) {}

    async execute(request: RegisterCarRequest): Promise<void> {
         
        const existCar = await this.carsRepository.findByPlate(request.plate)

        if(existCar){
            throw new Error("Car already exists")
        }
        
        const car = new Car({
            id: uuidv4(),
            brand: request.brand,
            model: request.model,
            plate: request.plate
        })

        //in-memory:::Trocar para banco de dados posteriormente
        await this.carsRepository.create(car)
    }
}