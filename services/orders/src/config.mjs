import process from "process";

const config = {
  // set LOG_LEVEL to "verbose" for detailed logging
  VERBOSE_LOGGING: process.env.LOG_LEVEL === "verbose",

  HTTP_PORT: process.env.HTTP_PORT || 3000,
  HTTP_IP: process.env.HTTP_IP || "0.0.0.0",

  failureMode: false,

  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 1025, // mailhog defaults to 1025
  // SMTP_HOST can be set to something like "smtp.service.consul"
  SMTP_HOST: process.env.SMTP_HOST || "127.0.0.1",

  // potential values for SHIPMENTS_URL
  // Consul DNS: "http://shipments.service.consul:5000/shipments"
  // 127.0.0.1: "http://127.0.0.1:5000" (careful IPv6/localhost)
  // generic DNS: "http://shipments:5000" - might leverage DNS search domains to form FQDN for DNS resolution, thus introducing another way to parameterize URL
  SHIPMENTS_URL: process.env.SHIPMENTS_URL || "http://127.0.0.1:5000",

  HTTPBIN_URL: process.env.HTTPBIN_URL || "http://httpbin.org"
};

export { config };
