const config = {
  LOG_LEVEL: process.env.LOG_LEVEL || "info", // set to "debug" for detailed logging

  HTTP_PORT: process.env.HTTP_PORT || 3000,
  HTTP_IP: process.env.HTTP_IP || "0.0.0.0",

  failureMode: false,
};

export { config };
