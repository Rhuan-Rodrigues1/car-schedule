import { Reservation, IReservation } from "../../domain/entities/Reservation";


export interface IReservationRepository {
    create(reservation: IReservation): Promise<any>
    findById(id: string): Promise<Reservation | null>
    save(reservation: IReservation): Promise<any>
}