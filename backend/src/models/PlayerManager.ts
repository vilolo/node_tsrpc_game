import Player from "./Player";
import Singleton from "./Singleton";

export default class PlayerManager extends Singleton {
    static get Instance(){
        return super.GetInstance<PlayerManager>()
    }

    private openidMapPlayers: Map<string, Player> = new Map();

    createPlayer(player:Player) {
        this.openidMapPlayers.set(player.openid, player);
    }

    getPlayerByOpendid(openid:string){
        return this.openidMapPlayers.get(openid);
    }
}