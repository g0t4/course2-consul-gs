import axios from "axios";

const shipmentsClient = {
  getShipmentsForOrder(orderId) {
    return axios.get("http://shipments:5000/shipments");
  },
};

export { shipmentsClient };

// https://www.npmjs.com/package/axios
// https://axios-http.com/
