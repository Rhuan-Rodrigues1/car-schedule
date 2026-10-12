
import { describe, it, expect } from "vitest";
import { Reservation } from "./Reservation";

describe("Reservation", () => {
    const makeReservation = () => {
        return new Reservation({
            id: "reservation-1",
            requesterId: "user-1",
            driverId: "driver-1",
            carId: "car-1",
            destination: "Belo Horizonte",
            purpose: "Consulta médica",
            startAt: new Date("2026-11-10T08:00:00"),
            endAt: new Date("2026-11-10T12:00:00"),
        });
    };

    it("should create a reservation with PENDING status", () => {
        const reservation = makeReservation();

        expect(reservation.status).toBe("PENDING");
        expect(reservation.requesterId).toBe("user-1");
        expect(reservation.driverId).toBe("driver-1");
        expect(reservation.carId).toBe("car-1");
    });

    it("should not create a reservation when startAt is after endAt", () => {
        expect(() => {
            new Reservation({
                id: "reservation-1",
                requesterId: "user-1",
                driverId: "driver-1",
                carId: "car-1",
                destination: "Belo Horizonte",
                purpose: "Consulta médica",
                startAt: new Date("2026-11-10T12:00:00"),
                endAt: new Date("2026-11-10T08:00:00"),
            });
        }).toThrow("Reservation start must be before end");
    });

    it("should not create a reservation when startAt equals endAt", () => {
        const date = new Date("2026-11-10T08:00:00");

        expect(() => {
            new Reservation({
                id: "reservation-1",
                requesterId: "user-1",
                driverId: "driver-1",
                carId: "car-1",
                destination: "Belo Horizonte",
                purpose: "Consulta médica",
                startAt: date,
                endAt: date,
            });
        }).toThrow("Reservation start must be before end");
    });

    it("should accept a pending reservation", () => {
        const reservation = makeReservation();

        reservation.accept();

        expect(reservation.status).toBe("ACCEPTED");
        expect(reservation.acceptedAt).toBeInstanceOf(Date);
    });

    it("should not accept a reservation twice", () => {
        const reservation = makeReservation();

        reservation.accept();

        expect(() => reservation.accept()).toThrow(
            "Reservation is not pending"
        );
    });

    it("should not start a trip before the reservation is accepted", () => {
        const reservation = makeReservation();

        expect(() => reservation.startTrip()).toThrow(
            "Reservation is not accepted"
        );
    });

    it("should start an accepted trip", () => {
        const reservation = makeReservation();

        reservation.accept();
        reservation.startTrip();

        expect(reservation.status).toBe("IN_PROGRESS");
        expect(reservation.startedAt).toBeInstanceOf(Date);
    });

    it("should complete a trip that is in progress", () => {
        const reservation = makeReservation();

        reservation.accept();
        reservation.startTrip();
        reservation.completeTrip();

        expect(reservation.status).toBe("COMPLETED");
        expect(reservation.completedAt).toBeInstanceOf(Date);
    });

    it("should not complete a trip that has not started", () => {
        const reservation = makeReservation();

        expect(() => reservation.completeTrip()).toThrow(
            "Trip is not in progress"
        );
    });

    it("should not complete a trip twice", () => {
        const reservation = makeReservation();

        reservation.accept();
        reservation.startTrip();
        reservation.completeTrip();

        expect(() => reservation.completeTrip()).toThrow(
            "Trip is not in progress"
        );
    });
});
