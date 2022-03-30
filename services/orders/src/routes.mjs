import { config } from "./config.mjs";
import { info, verbose } from "./logging.mjs";

function throwIfFailureMode() {
  if (!config.failureMode) return;
  verbose("request made during failure mode, throwing error...");
  throw new Error("simulated failure");
}

function addRoutes(server) {
  server.route({
    method: "GET",
    path: "/orders/submit",
    options: { description: "sends email notification" },
    handler: () => {
      throwIfFailureMode();
      // TODO send email notification
      return "Order submitted";
    },
  });

  server.route({
    method: "GET",
    path: "/orders/report/{id}",
    options: { description: "calls shipments service" },
    handler: (request) => {
      throwIfFailureMode();
      // TODO call out to shipments service for list of shipments
      return `
      Order Report
      Order ID: ${request.params.id}
      
      `;
    },
  });

  server.route({
    method: "GET",
    path: "/simulate/normal",
    options: { description: "disables Failure Mode" },
    handler: () => {
      config.failureMode = false;
      info("Failure mode disabled");
      return "Failure Mode disabled";
    },
  });
  server.route({
    method: "GET",
    path: "/simulate/failure",
    options: { description: "enables Failure Mode" },
    handler: () => {
      config.failureMode = true;
      info("Failure mode enabled");
      return "Failure Mode enabled, all subsequent requests will fail.";
    },
  });
}

export { addRoutes };
