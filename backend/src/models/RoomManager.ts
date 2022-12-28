import { WsConnection } from "tsrpc";
import { ReqJoin } from "../shared/protocols/PtlJoin";
import { Room } from "./Room";
import Singleton from "./Singleton";

export default class RoomManager extends Singleton {
    static get Instance() {
        return super.GetInstance<RoomManager>();
    }

    nextRoomId = 1;

    idMapRoom: Map<number, Room> = new Map();

    createRoom() {
        const room = new Room(this.nextRoomId++);
        this.idMapRoom.set(room.id, room);
        return room;
    }

    joinRoom(req:ReqJoin, conn:WsConnection) {
        const room = this.getRoomById(req.rid);
        if (room) {
            room.join(req,conn);
            return room;
        }
    }

    getRoomById(id: number) {
        return this.idMapRoom.get(id);
    }
}