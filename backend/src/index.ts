import * as path from "path";
import { WsConnection, WsServer } from "tsrpc";
import { Room } from "./models/Room";
import RoomManager from "./models/RoomManager";
import { serviceProto, ServiceType } from './shared/protocols/serviceProto';

// Create the Server
export const server = new WsServer(serviceProto, {
    port: 3000,
    // Remove this to use binary mode (remove from the client too)
    json: true
});

// 断开连接后退出房间
server.flows.postDisconnectFlow.push(v => {
    let conn = v.conn as WsConnection<ServiceType>;
    if (conn.openid) {
        // roomInstance.leave(conn.openid, conn);
    }

    return v;
});

//多房间，先创一个房
RoomManager.Instance.createRoom();
RoomManager.Instance.createRoom();

// Initialize before server start
async function init() {
    await server.autoImplementApi(path.resolve(__dirname, 'api'));

    // TODO
    // Prepare something... (e.g. connect the db)
};

// Entry function
async function main() {
    await init();
    await server.start();
}
main();