import { config } from "./config.mjs";
import { info, verbose, error } from "./logging.mjs";
import { shipmentsClient } from "./shipments.mjs";
import { sendOrderedEmail } from "./email.mjs";
import { httpBinClient } from "./httpbin.mjs";

function addRoutes(server) {
  server.route({
    method: "GET",
    path: "/orders/submit",
    options: { description: "sends email notification" },
    handler: async (request, h) => {
      return errorIfFailureMode(h)
        || await sendOrderedEmail()
            .then(() => h.response("Order submitted, email sent"))
            .catch(e => errorResponse(h, e, "Failure sending email"));
    },
  });

  server.route({
    method: "GET",
    path: "/orders/report/{id}",
    options: { description: "calls shipments service" },
    handler: async (request, h) => {
      const orderId = request.params.id;
      
      return errorIfFailureMode(h)
        || await shipmentsClient.getShipmentsForOrder(orderId)
        .then(shipments => {
          const response = h.response({
            title: "Order Report",
            orderId,
            "shipments-instance": shipments.headers["shipments-instance"],
            shipments: shipments.data,
          });
          // time permit - tracing, metrics - observability + Connect
          Object.entries(shipments.headers)
            .forEach(entry => response.header(`shipments-${entry[0]}`, entry[1]));
          return response;
        })
        .catch(e => errorResponse(h, e, "Failure querying shipments"));

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
    path: "/httpbin/{path*}",
    options: { description: "proxy httpbin.org - to validate DNS recursion" },
    handler: async (request, h) => {
      const path = request.params.path;
      if (typeof path !== "string" || path.length === 0) {
        verbose("empty path, redirecting to /httpbin/get");
        return h.redirect("/httpbin/get");
      }

      return errorIfFailureMode(h)
        || await httpBinClient.proxy(path)
            .then(r => h.response(r.data))
            .catch(e => errorResponse(h, e, "Failure proxying httpbin.org"));
    },
  });

  server.route({
    method: "GET",
    path: "/",
    options: { description: "list routes" },
    handler: (request, h) =>
      errorIfFailureMode(h) ||
      `routes: <br/>
<a href="/orders/report/1">/orders/report/{id}</a> - generate order report (calls shipments service) 
<br/>
<a href="/orders/submit">/orders/submit</a> - sends email notification 
<br/>
<a href="/httpbin/headers">/httpbin/get</a> - test DNS recursion (via httpbin.org)
<br/>
<a href="/simulate/failure">/simulate/failure</a> - enable Failure Mode 
<br/>
<a href="/simulate/resume">/simulate/resume</a> - disable Failure Mode <br/>
`,
  });
}

function errorResponse(h, e, description) {
  // note: run the risk of serialization failures when logging message and/or responding with it - just FYI - so far ok
  error(e);
  return h
    .response({
      message: "Internal Server Error",
      description,
      error: e,
      statusCode: 500,
    })
    .code(500);
}

function errorIfFailureMode(h) {
  if (!config.failureMode) return;
  verbose("request made during failure mode, throwing error...");
  return h.response("simulated failure").code(500);
}

export { addRoutes };

/*

Server: 
- https://hapi.dev/api#server

Routing:
- https://hapi.dev/tutorials/routing

Handlers: 
- https://hapi.dev/tutorials/routing#handler
- handler parameters:
  - `request`: https://hapi.dev/api#request
  - `h` (response toolkit): https://hapi.dev/api#response-toolkit
- response object:
  - https://hapi.dev/api/?v=20.2.1#response-object
  - builder interface
*/
