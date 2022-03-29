import { config } from "./config.mjs";

function debug(message) {
  if (config.LOG_LEVEL !== "debug") return;
  console.log("[DEBUG] " + message);
}

function info(message) {
  console.log("[INFO] " + message);
}

function setupLogging(server) {
  server.events.on("request", (request) => {
    // https://hapi.dev/api#-request-event
    debug(`request: ${JSON.stringify(request)}`);
  });

  server.events.on("response", (request) => {
    // https://hapi.dev/api#-response-event
    // https://hapi.dev/api#request
    console.log(`response sent: ${request.path}`);
  });

  server.events.on("route", (route) => {
    // https://hapi.dev/api#-route-event
    // route info: https://hapi.dev/api#request.route
    debug(`route setup: '${route.path}' - ${route.settings.description}`);
  });

  server.events.on("start", () => {
    // https://hapi.dev/api#-start-event
    info("orders service started, listening at " + server.info.uri);
  });

  server.events.on("closing", () => {
    // https://hapi.dev/api#-closing-event
    info("server stopping, no longer accepting new requests...");
  });

  server.events.on("stop", () => {
    // https://hapi.dev/api#-stop-event
    info("server stopped");
  });
}

export { info, debug, setupLogging };
