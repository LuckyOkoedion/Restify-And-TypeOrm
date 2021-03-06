import "reflect-metadata";
import { ApiServer } from "./server/index";
import { DatabaseProvider } from "./database/index";
import * as PostgressConnectionStringParser from "pg-connection-string";

// ON HEROKU

const connectionOptions = PostgressConnectionStringParser.parse(
  process.env.DATABASE_URL
);

DatabaseProvider.configure({
  type: process.env.TYPEORM_DRIVER_TYPE || "postgres",
  database: connectionOptions.database,
  username: connectionOptions.user,
  password: connectionOptions.password,
  host: connectionOptions.host,
  port: connectionOptions.port || 5432
});

//ON LOCAL HOST

// DatabaseProvider.configure({
//   type: (process.env.DATABASE_TYPE as any) || "postgres",
//   database: process.env.DATABASE_NAME || "apitest",
//   username: process.env.DATABASE_USERNAME || "admin",
//   password: process.env.DATABASE_PASSWORD || "admin",
//   host: process.env.DATABASE_HOST || "localhost",
//   port: +process.env.DATABASE_PORT || 5432,
//   ssl: !!process.env.USE_SSL
// });

const server = new ApiServer();
server.start(+process.env.PORT || 3000);
