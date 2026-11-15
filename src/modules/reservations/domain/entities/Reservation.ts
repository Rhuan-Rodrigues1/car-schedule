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

    constructor(props: Omit<IReservation, 'status' | 'createdAt'> & {
        status?: ReservationStatus;
        createdAt?: Date;
    }) {
        if(props.startAt > props.endAt) {
            throw new Error("Invalid reservation period")
        }

        if(props.startAt === props.endAt) {
            throw new Error("Reservation start must be before end")
        }

        this.props = {
            ...props,
            status: props.status ?? "PENDING",
            createdAt: props.createdAt ?? new Date()
        }
    }

    public accept(): void {
        if(this.props.status !== "PENDING") {
            throw new Error("Reservation is not pending")
        }
        this.props.status = "ACCEPTED"
        this.props.acceptedAt = new Date()
    }

    public startTrip(): void {
        if(this.props.status !== "ACCEPTED") {
            throw new Error("Reservation is not accepted")
        }

        this.props.status = "IN_PROGRESS"
        this.props.startedAt = new Date()

    }
    //review
    public completeTrip(): void {
        if(this.props.status !== "IN_PROGRESS") {
            throw new Error("Trip is not in progress")
        }
        this.props.status = "COMPLETED"
        this.props.completedAt = new Date()
    }

    get id(): string {
        return this.props.id
    }

    get driverId(): string {
        return this.props.driverId
    }

    get carId(): string {
        return this.props.carId
    }

    get status(): string {
        return this.props.status
    }

    get requesterId(): string {
        return this.props.requesterId
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    get acceptedAt(): Date | undefined {
        return this.props.acceptedAt
    }

    get startedAt(): Date | undefined {
        return this.props.startedAt
    }
    
    get completedAt(): Date | undefined {
        return this.props.completedAt
    }

    get startAt(): Date {
        return this.props.startAt
    }


    get endAt(): Date {
        return this.props.endAt
    }
}