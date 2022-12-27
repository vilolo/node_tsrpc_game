import Player from "./Player";

export default class Room {
    rid: number
    openid: string //建房人

    constructor(rid: number,openid: string) {
        this.rid = rid;
        this.openid = openid;
    }
}