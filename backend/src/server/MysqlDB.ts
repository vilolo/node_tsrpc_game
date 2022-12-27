import mysql,{ConnectionConfig, queryCallback} from 'mysql';

export default class MysqlDB{
    conn:mysql.Connection

    constructor(){
        this.conn = mysql.createConnection(this.config);
        this.conn.connect();
    }

    config = {
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'root',
        database:'snake_game'
    }

    query(sql:string, params:any, cb:queryCallback, manualEnd?:boolean){
        this.conn.query(sql, params, cb);
        //多个sql时可以手动关闭
        if(!manualEnd){
            this.conn.end();
        }
    }
}