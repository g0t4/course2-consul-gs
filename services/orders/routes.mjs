function addRoutes(server) {
  server.route({
    method: "GET",
    path: "/orders/submit",
    handler: () => {
      return "Order submitted";
    },
  });

  server.route({
    method: "GET",
    path: "/orders/report/{id}",
    handler: (request) => {
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
      return "Failure Mode disabled.";
    },
  });
  server.route({
    method: "GET",
    path: "/simulate/failure",
    handler: () => {
      return "Failure Mode enabled, all subsequent requests will fail.";
    },
  });
}

export { addRoutes };
