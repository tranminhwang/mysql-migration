export interface IMysqlConfig {
  mysqlUserName: string;
  mysqlHost: string;
  mysqlPassword: string;
  mysqlDatabase: string;
}

export const mysqlConfig = (options: IMysqlConfig): string => {
  try {
    if (!options) throw new Error(`MySQL configuration options are required!`);
    return `mysql://${options.mysqlUserName.trim()}:${options.mysqlPassword.trim()}@${options.mysqlHost.trim()}:3306/${options.mysqlDatabase.trim()}?connectionLimit=10&dateStrings=true`;
  } catch (error) {
    process.exit(1);
  }
};
