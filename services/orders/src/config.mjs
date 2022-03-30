import process from "process";

const config = {
  // set LOG_LEVEL to "verbose" for detailed logging
  VERBOSE_LOGGING: process.env.LOG_LEVEL === "verbose",

  HTTP_PORT: process.env.HTTP_PORT || 3000,
  HTTP_IP: process.env.HTTP_IP || "0.0.0.0",

  failureMode: false,
};

export { config };
