import axios from "axios";
import { config } from "./config.mjs";

const shipmentsClient = {
  getShipmentsForOrder(orderId) {
    return axios.get(`${config.SHIPMENTS_URL}/shipments`);
  },
};

export { shipmentsClient };

// https://www.npmjs.com/package/axios
// https://axios-http.com/
