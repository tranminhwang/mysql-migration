import dotenv from "dotenv";
dotenv.config();

import { IMysqlConfig, mysqlConfig } from "./configs/index";
import { MysqlDatabase } from "@/configs/mysql.config";
import { mysqlPrompts } from "@/configs/prompts.config";
import { Migrate } from "@/lib/migrate";

(async () => {
  // @ts-ignore
  const prompts = (await import("prompts")).default;
  // @ts-ignore
  const mysqlConf = (await prompts(mysqlPrompts)) as IMysqlConfig;
  const mysqlConn = new MysqlDatabase(mysqlConfig(mysqlConf));

  const migrate = new Migrate({
    mysqlConn,
  });

  await migrate.retrieveModels();
  await migrate.retrieveMysqlData();
})();
