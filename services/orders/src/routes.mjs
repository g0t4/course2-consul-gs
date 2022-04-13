import { config } from "./config.mjs";
import { info, verbose, error } from "./logging.mjs";
import { shipmentsClient } from "./shipments.mjs";
import { sendOrderedEmail } from "./email.mjs";
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
    handler: async () => {
      throwIfFailureMode();
      await sendOrderedEmail(); // will throw if promise rejected
      return "Order submitted, email sent";
    },
  });

  server.route({
    method: "GET",
    path: "/orders/report/{id}",
    options: { description: "calls shipments service" },
    handler: async (request) => {
      throwIfFailureMode();
      var orderId = request.params.id;
      var shipments = await shipmentsClient.getShipmentsForOrder(orderId);
      return {
        title: "Order Report",
        orderId,
        shipments: shipments.data,
        "shipments-instance": shipments.headers["shipments-instance"],
      };
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

  server.route({
    method: "GET",
    path: "/",
    options: { description: "list routes" },
    handler: () => {
      throwIfFailureMode();
      return `routes: <br/>
<a href="/orders/report/1">/orders/report/{id}</a> - generate order report (calls shipments service) 
<br/>
<a href="/orders/submit">/orders/submit</a> - sends email notification 
<br/>
<a href="/simulate/failure">/simulate/failure</a> - enable Failure Mode 
<br/>
<a href="/simulate/resume">/simulate/resume</a> - disable Failure Mode <br/>
`;
    },
  });
}

export { addRoutes };
