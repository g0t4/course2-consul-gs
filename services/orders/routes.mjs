import { config } from "./config.mjs";
import { info, debug } from "./logging.mjs";

function throwIfFailureMode() {
  if (!config.failureMode) return;
  debug("request made during failure mode, throwing error...")
  throw new Error("simulated failure");
}

function addRoutes(server) {
  server.route({
    method: "GET",
    path: "/orders/submit",
    handler: () => {
      throwIfFailureMode();

      return "Order submitted";
    },
  });

  server.route({
    method: "GET",
    path: "/orders/report/{id}",
    handler: (request) => {
      throwIfFailureMode();

      return `
      Order Report
      Order ID: ${request.params.id}
      
      `;
    },
  });

  server.route({
    method: "GET",
    path: "/simulate/healthy",
    handler: () => {
      config.failureMode = false;
      info("Failure mode disabled");
      return "Failure Mode disabled";
    },
  });
  server.route({
    method: "GET",
    path: "/simulate/failure",
    handler: () => {
      config.failureMode = true;
      info("Failure mode enabled");
      return "Failure Mode enabled, all subsequent requests will fail.";
    },
  });
}

export { addRoutes };
