const httpUtil = () => {};
/**
 *
 * @param {string} url - input url to remove trailing slash
 */
httpUtil.removeTrailingSlash = url => {
  if (/(\/)$/.test(url)) {
    url = url.slice(0, url.length - 1);
  }
  return url;
};

httpUtil.normalizeReqParams = params => {
  normalizedParams = {};
  if (Object.keys(params).length > 0) {
    Object.keys(params).map((key, index) => {
      if (params[key]) {
        normalizedParams[key] = params[key];
      }
    });
  }

  return normalizedParams;
};

/**
 *
 * @param {object} reqParams - k,v pairs of input req. query params
 * @returns {string} - the queryString value
 */

httpUtil.makeQueryString = (reqParams, reqUrl) => {
  if (!reqParams) {
    error = new Error("Missing or invalid parameters");
    return err;
  }
  reqParams = httpUtil.normalizeReqParams(reqParams);
  queryString = "";
  paramKeys = Object.keys(reqParams);
  paramsLen = paramKeys.length;
  if (paramsLen > 0) {
    paramKeys.map((key, index) => {
      if (reqParams[key]) {
        // append `?` to denote beginning of queryString
        if (index === 0) {
          queryString += "?";
        }
        queryString += `${key}=${reqParams[key]}`;
        nextKey = paramKeys[index + 1];
        nextElement = reqParams[`${nextKey}`];
        // append `&` if index isnt at the last element, and if next key isnt null
        if (index !== paramsLen - 1 && nextElement) {
          queryString += "&";
        }
      }
    });
  }
  if (reqUrl) {
    return `${httpUtil.removeTrailingSlash(reqUrl)}${queryString}`;
  } else {
    return queryString;
  }
};

/**
 * @param {object} response - HTTP response object
 * @returns {Promise} - Api Response
 */
httpUtil.handleApiResponse = response => {
  return new Promise(function(resolve, reject) {
    if (!/2[0-9]/.test(response.status)) {
      error = new Error(`Expected 2xx, found ${response.status}`);
      error.statusCode = response.status;
      reject(error);
    } else {
      try {
        // throws an error if body isnt valid json, catch that and resolve as text instead
        let body = JSON.stringify(response.body);
        resolve(response.json());
      } catch (error) {
        resolve(response.text());
      }
    }
  });
};

module.exports = httpUtil;
