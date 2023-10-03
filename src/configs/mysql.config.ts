import {
  Connection,
  OkPacketParams,
  ProcedureCallPacket,
  ResultSetHeader,
  RowDataPacket,
  createConnection,
  escape,
} from "mysql2";
import ora from "ora";

type QueryResult =
  | object[]
  | OkPacketParams
  | RowDataPacket[]
  | ResultSetHeader[]
  | RowDataPacket[][]
  | OkPacketParams[]
  | ProcedureCallPacket;

export class MysqlDatabase {
  private conn: Connection;
  constructor(config: string) {
    this.conn = createConnection(config);

    const spinner = ora("Establishing MySQL connection ").start();
    this.conn.connect((err) => {
      if (err) {
        spinner.fail(`Connection error ,${err.message}`);
        process.exit(1);
      }
      spinner
        .succeed("MySQL connection established. Press tab key to continue. \n")
        .stop();
    });
  }
  public query = (
    sql: string,
    params?: Array<string | number> | any
  ): Promise<QueryResult> => {
    return new Promise((resolve, reject) => {
      if (typeof params === "undefined") {
        this.conn.query(sql, (err, results) =>
          err ? reject(err) : resolve(results)
        );
      } else {
        this.conn.query(sql, params, (err, results) =>
          err ? reject(err) : resolve(results)
        );
      }
    });
  };

  public escape(param: string): string {
    return escape(param);
  }
}
