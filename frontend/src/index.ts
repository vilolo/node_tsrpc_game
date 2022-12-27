import { WsClient } from "tsrpc-browser";
import { Chatroom } from "./Chatroom";
import { serviceProto } from "./shared/protocols/serviceProto";

document.querySelectorAll('.chat-room').forEach(v => {
    new Chatroom(v as HTMLDivElement);
});

export { };

// == test ===
const client = new WsClient(serviceProto, {
    server: 'ws://127.0.0.1:3000',
    json: true
});

async function test(){
    // 由于是长连接，所以要先连接
    let resConnect = await client.connect();
    if(!resConnect.isSucc){
        console.error('连接失败', resConnect.errMsg);
    }

    let ret = await client.callApi('Login', { 
        'openid':'777',
        'nickname':'777'
    });
    console.log(ret);
}

test()
