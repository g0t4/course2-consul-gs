import axios from "axios";
import { config } from "./config.mjs";
import { verbose } from "./logging.mjs";

// https://httpbin.org/get
// - see site for various endpoints that can be proxied, such as:
//   /httpbin/headers
//   /httpbin/uuid
// - multiple segments work too:
//   /httpbin/anything/foobar
//

const httpBinClient = {
  proxy(path) {
    const url = `${config.HTTPBIN_URL}/${path}`;
    verbose(`proxying ${url}`);
    return axios.get(url);
  },
};

export { httpBinClient };
