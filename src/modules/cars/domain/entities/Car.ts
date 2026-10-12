
export interface ICar {
    id: string,
    brand: string,
    model: string,
    plate: string

}

export class Car {
    private readonly props: ICar;

    constructor(props: ICar) {
        
        if(!props.plate) {
            throw new Error("Carro deve ter placa !!") 
        }

        this.props = props
    }


    get id(): string {
        return this.props.id
    }

    get brand(): string {
        return this.props.brand
    }

    get model(): string {
        return this.props.model
    }

    get plate(): string {
        return this.props.plate
    }

}