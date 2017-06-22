import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config";
import { BaseService } from ".";

function encrypt(text) {
  let cipher = crypto.createCipher(config.CRYPTO_ALGO, config.JWT_SECRET);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

class AuthenticationService extends BaseService {
  login({ username, password }) {
    let debug = this.debug;
    let authorization =
      "Basic " + new Buffer(username + ":" + password).toString("base64");

    debug("login:", authorization);

    return fetch(`${config.API_BASE_URL}/about`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authorization
      }
    }).then(function(res) {
      if (res.status === 401) {
        throw Error("Unauthorized.");
      } else if (res.status === 403) {
        throw Error("Access Denied.");
      } else {
        debug("Authorized!");
        // let expiresIn = '1h';
        let expires = Math.floor(Date.now() / 1000) + config.JWT_EXPIRE * 60;
        let token = jwt.sign(
          {
            exp: expires,
            username,
            password: encrypt(password)
          },
          config.JWT_SECRET
          //{ expiresIn }
        );
        return Object({ token, expires: expires });
      }
    });
  }
}

export { AuthenticationService };
