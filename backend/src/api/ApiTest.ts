import { ApiCall } from "tsrpc";
import MysqlDB from "../server/MysqlDB";
import { ReqTest, ResTest } from "../shared/protocols/PtlTest";

export default async function (call: ApiCall<ReqTest, ResTest>) {
    // MysqlDB.connect('select * from test',[],(err:any,res:any)=>{
    //     console.log(err);
    //     console.log(res);
    // })

    (new MysqlDB()).query('select * from test',[],(err:any,res:any)=>{
        console.log(err);
        console.log(res);
    });
    
    // TODO
    call.error('API Not Implemented');
}