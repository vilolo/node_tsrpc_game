import { WsClient } from "tsrpc-browser";
import { Chatroom } from "./Chatroom";
import { MsgClientInput } from "./shared/protocols/client/MsgClientInput";
import { serviceProto } from "./shared/protocols/serviceProto";

// document.querySelectorAll('.chat-room').forEach(v => {
//     new Chatroom(v as HTMLDivElement);
// });

// export { };

// == test ===
const client = new WsClient(serviceProto, {
    server: 'ws://121.199.56.242:3001',
    json: true
});

async function test(){
    // 由于是长连接，所以要先连接
    let resConnect = await client.connect();
    if(!resConnect.isSucc){
        console.error('连接失败', resConnect.errMsg);
    }

    let openid = 'openid222'

    let ret = await client.callApi('Login', { 
        'openid':openid,
        'nickname':'777'
    });
    console.log("登录");
    console.log(ret);

    //加入房间
    let bb = await client.callApi('Join', { 
        'rid':1,
        'openid':openid
    });
    console.log("加入房间");
    console.log(bb);

    //监听消息
    let handler = client.listenMsg('server/Frame', msg => {
        // msg 即为 MsgChat
        console.log(msg);
    });

    //定时同步位置
    let lastSN = 0
    let msg: MsgClientInput = {
        sn: ++lastSN,
        inputs: [{
            type: 'PlayerMove',
            speed: { x: Math.random(), y: Math.random() },
            // 移动的时间 (秒)
            dt: 2,
        }]
    }
    client.sendMsg('client/ClientInput', msg);
}

test()
