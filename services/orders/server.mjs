import Hapi, { server } from "@hapi/hapi";
import { abortOnUnhandledRejection } from "./errors.mjs";
import { addRoutes } from "./routes.mjs";
import { config } from "./config.mjs";
import { setupLogging, debug } from "./logging.mjs";

const runService = async () => {
  const options = {
    port: config.HTTP_PORT,
    host: config.HTTP_IP,
  };
  const server = Hapi.server(options);

  setupLogging(server); // must be prior to registering routes to log them
  addRoutes(server);

  await server.start();
};

abortOnUnhandledRejection();
runService();
