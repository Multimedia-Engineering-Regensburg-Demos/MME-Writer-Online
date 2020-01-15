/* eslint-env browser */

const API_BASE_URL = "http://localhost:8080/file";

function makeAPICall(route, method) {
  return new Promise(function(resolve, reject) {
    fetch(API_BASE_URL + route, {
      method: method,
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      resolve(result);
    });
  });
}

class Storage {

  create() {
    return makeAPICall("/new", "PUT");
  }

  load(id) {
    return makeAPICall("/" + id, "GET");
  }

  save(id, text) {
    return makeAPICall("/" + id + "/" + text, "POST");
  }

}

export default Storage;