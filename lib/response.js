function buildResponse(statusCode, data) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(data),
  };
}

// The server successfully processed the request and is returning the requested data
export function success(data) {
  return buildResponse(200, data);
}

// The request has been fulfilled and a new resource has been created
export function created(data) {
  return buildResponse(201, data);
}

// The server could not understand the request due to invalid syntax, missing parameters, or other client-side errors
export function badRequest(data) {
  return buildResponse(400, data);
}

// The client must authenticate itself to get the requested response
export function unauthorized(data) {
  return buildResponse(401, data);
}

// The client does not have access rights to the content, i.e., they are unauthorized to perform the requested action
export function forbidden(data) {
  return buildResponse(403, data);
}

// The server cannot find the requested resource, i.e., the URI does not match any known resource
export function notFound(data) {
  return buildResponse(404, data);
}

// The server encountered an unexpected condition that prevented it from fulfilling the request
export function internalServerError(data) {
  return buildResponse(500, data);
}
