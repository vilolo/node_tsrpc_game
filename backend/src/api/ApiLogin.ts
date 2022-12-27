import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../shared/protocols/PtlLogin";
import MysqlDB  from "../server/MysqlDB";
import PlayerManager from "../biz/PlayerManager";
import Player from "../biz/Player";

export default async function (call: ApiCall<ReqLogin, ResLogin>) {
    const conn = new MysqlDB();
    var uid :number = 0;

    // conn.query('select * from user where openid = ?',[call.req.openid],(err, res)=>{
    //     if(res.length > 0){
    //         uid = res[0].id;
    //         call.succ({user:{uid:uid}});
    //     }else{
    //         conn.query('insert into user(nickname,openid,avatar) values(?,?,?)',[call.req.openid,call.req.openid,call.req.avatar],(err2, res2)=>{
    //             uid = res2.insertId
    //             if(uid > 0){
    //                 call.succ({user:{uid:uid}});
    //             }else{
    //                 call.error('用户添加失败')
    //             }
    //         })
    //         conn.conn.end();
    //     }
    // },true);

    await new Promise((resolve,reject)=>{
        conn.query('select * from user where openid = ?',[call.req.openid],(err, res)=>{
            if(res.length > 0){
                uid = res[0].id;
            }
            resolve(uid)
        },true);
    });

    if(uid == 0){
        await new Promise((resolve,reject)=>{
            conn.query('insert into user(nickname,openid,avatar) values(?,?,?)',[call.req.openid,call.req.openid,call.req.avatar],(err2, res2)=>{
                uid = res2.insertId
                resolve(uid)
            })  
        })
    }else{
        conn.conn.end();
    }

    if(uid > 0){
        //添加用户
        PlayerManager.Instance.createPlayer(new Player({id:uid,openid:call.req.openid,nickname:call.req.nickname}))
        call.succ({user:{uid:uid}});
    }else{
        call.error('用户添加失败')
    }
}