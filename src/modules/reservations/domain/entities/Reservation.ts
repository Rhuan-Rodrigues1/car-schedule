export type ReservationStatus = 
        | "PENDING"
        | "ACCEPTED"
        | "REJECTED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "CANCELLED"

interface IReservation {
    id: string;
    requesterId: string;
    driverId: string;
    carId: string;
    destination: string;
    purpose: string;
    startAt: Date;
    endAt: Date;
    status: ReservationStatus;
    createdAt: Date;
    acceptedAt?: Date;
    startedAt?: Date;
    completedAt?: Date;
}


export class Reservation {
    private readonly props: IReservation;

    constructor(props: IReservation) {
        if(props.startAt >= props.endAt) {
            throw new Error("Invalid reservation period")
        }

        this.props = {
            ...props,
            status: props.status ?? "PENDING"
        }
    }

    get id(): string {
        return this.props.id
    }

    get carId(): string {
        return this.props.carId
    }

    get requesterId(): string {
        return this.props.requesterId
    }

    get startAt(): Date {
        return this.props.startAt
    }


    get endAt(): Date {
        return this.props.endAt
    }
}