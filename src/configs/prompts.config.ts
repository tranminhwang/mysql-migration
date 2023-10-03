export const mysqlPrompts = [
  {
    type: "text",
    name: "mysqlHost",
    message: "MySQL database host address?",
    initial: process.env.DATABASE_HOST ?? "127.0.0.1",
  },
  {
    type: "text",
    name: "mysqlUserName",
    message: "MySQL database authentication username?",
    initial: process.env.DATABASE_USERNAME ?? "root",
  },
  {
    type: "password",
    name: "mysqlPassword",
    message: "MySQL database authentication password?",
    initial: process.env.DATABASE_PASSWORD ?? "root",
  },
  {
    type: "text",
    name: "mysqlDatabase",
    message: "MySQL database name?",
    initial: process.env.DATABASE_NAME ?? "test",
  },
];
