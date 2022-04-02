import axios from "axios";

const shipmentsClient = {
  getShipmentsForOrder(orderId) {
    // TODO query HTTP API example - i.e. http://localhost:8500/
    // TODO v1/catalog/service/shipments (addy vs service addy, port...)
    return axios.get("http://shipments:5000/shipments");
  },
};

export { shipmentsClient };

// https://www.npmjs.com/package/axios
// https://axios-http.com/
