import { Client } from "./types";
export declare class ClientStore {
    prevClients: Client[];
    startClients: Client[];
    movement: number;
    length: number;
    constructor(clients: Client[]);
    addClients(clients?: Client[]): import("./types").Position;
    getAngle(clients?: Client[]): number;
    getRotation(clients?: Client[]): number;
    getPosition(clients?: Client[]): import("./types").Position;
    getPositions(clients?: Client[]): import("./types").Position[];
    getMovement(clients?: Client[]): number;
    getDistance(clients?: Client[]): number;
    getScale(clients?: Client[]): number;
    move(deltaX: number, deltaY: number): void;
}
