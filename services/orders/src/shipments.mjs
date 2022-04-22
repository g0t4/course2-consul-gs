import axios from "axios";
import { config } from "./config.mjs";

const shipmentsClient = {
  getShipmentsForOrder(orderId) {
    return axios.get(`${config.SHIPMENTS_URL}/shipments`, {
      // request timeout
      timeout: 5000, // ensure watch demos don't hang for 30-60sec or longer
      // - timeout is generic but works (shows failure)
      // - 5 seconds should be plenty for my docker demos
      // on timeout - just make another request until meaningful message (ie unreachable after taking service offline)
    });
  },
};

export { shipmentsClient };

// https://www.npmjs.com/package/axios
// https://axios-http.com/
