import { config } from "./config.mjs";
import { info, verbose } from "./logging.mjs";
import { shipmentsClient } from "./shipments.mjs";

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
      var orderId = request.params.id;
      var shipments = shipmentsClient.getShipmentsForOrder(orderId);
      return `
      Order Report <br/>
      Order ID: ${orderId} <br/><br/>
      Shipments: ${JSON.stringify(shipments)} <br/>
      `;
    },
  });

  server.route({
    method: "GET",
    path: "/simulate/resume",
    options: { description: "disable Failure Mode" },
    handler: () => {
      config.failureMode = false;
      const message = "Failure Mode disabled";
      info(message);
      return message;
    },
  });
  server.route({
    method: "GET",
    path: "/simulate/failure",
    options: { description: "enable Failure Mode" },
    handler: () => {
      config.failureMode = true;
      const message = "Failure Mode enabled";
      info(message);
      return message;
    },
  });
}

export { addRoutes };
