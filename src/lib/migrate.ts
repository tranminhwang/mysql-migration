import { MysqlDatabase } from "@/configs/mysql.config";
import path from "path";
import fs from "fs";

export class Migrate {
  private models: string[] = []; // ["roles", "reward_points"]
  private dataFileDir: string;
  private modelsDir: string;
  private modelsSchema: Map<string, string>;
  private mysqlDB: MysqlDatabase;

  constructor(options: { mysqlConn: MysqlDatabase }) {
    this.dataFileDir = path.join(process.cwd(), `/generated-json-data-files/`);
    this.modelsDir = path.join(
      process.cwd(),
      `/generated-schema-model-definitions/`
    );
    this.modelsSchema = new Map();
    this.mysqlDB = options.mysqlConn;
  }

  public async retrieveModels(): Promise<void> {
    const modelInfo = (await this.mysqlDB.query(
      `show full tables where Table_Type = 'BASE TABLE'`
    )) as Array<{ [x: string]: any }>;

    this.models = modelInfo.map((res: { [x: string]: any }) => {
      return res[Object.keys(res)[0]];
    });
    console.log(this.models);
  }

  public async retrieveMysqlData(): Promise<void> {
    if (!this.models || !this.models.length)
      throw new Error(`Call retrieve models to get MySQL models!`);
    try {
      const files = fs.readdirSync(this.dataFileDir);
      if (files.length) {
        for await (const file of files) {
          fs.unlinkSync(this.dataFileDir + file);
        }
      }
    } catch {
      fs.mkdirSync(this.dataFileDir);
    }

    for await (const model of this.models) {
      const modelData = await this.mysqlDB.query(`SELECT * FROM ${model}`);
      const file = `${this.dataFileDir + model}.json`;
      fs.writeFileSync(file, JSON.stringify(modelData));
    }
    console.log(
      `Found ${
        this.models.length
      } models and wrote into json files in ${Math.floor(
        process.uptime()
      )} s and `
    );
  }
}
