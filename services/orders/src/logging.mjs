import { config } from "./config.mjs";

function verbose(...message) {
  if (!config.VERBOSE_LOGGING) return;
  console.log("[VERBOSE]", ...message);
}

function error(error, ...message) {
  console.error("[ERROR]", ...message, error);
}

function info(...message) {
  console.log("[INFO]", ...message);
}

function logConfig() {
  info(`LOG_LEVEL: ${config.LOG_LEVEL}`);
  info(`SHIPMENTS_URL: ${config.SHIPMENTS_URL}`);
  verbose(`HTTP_PORT: ${config.HTTP_PORT}`);
  verbose(`HTTP_IP: ${config.HTTP_IP}`);
}

function setupLogging(server) {
  logConfig();

  // Life Cycle (events): https://hapi.dev/api#request-lifecycle

  // log request errors (ie connection failure to shipments service, ie IPv6/localhost)
  server.events.on("request", (request, event, tags) => {
    if (tags.error) {
      const message = event.error ? event.error.message : "unknown";
      verbose(`request ${event.request} error: ${message}`);
    }
  });

  server.events.on("response", (request) => {
    // https://hapi.dev/api#-response-event
    // https://hapi.dev/api#request
    verbose(`response sent: ${request.path}`);
  });

  server.events.on("route", (route) => {
    // https://hapi.dev/api#-route-event
    // route info: https://hapi.dev/api#request.route
    verbose(`route setup: '${route.path}' - ${route.settings.description}`);
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

export { info, verbose, error, setupLogging };
