export default class Player {
    id: number
    openid: string
    nickname: string
    rid?:number
    
    constructor({id, openid, nickname}:Player){
        this.openid = openid;
        this.id = id;
        this.nickname = nickname;
    }
}