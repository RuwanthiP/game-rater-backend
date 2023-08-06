import jwtDecode from "jwt-decode";
import {
  moderatorAllowedResources,
  reviewerAllowedResources,
} from "../../lib/resources/allowedResources";

export const handler = async (event, context, callback) => {
  const authorizationHeader = event.authorizationToken;

  const methodArn = event.methodArn;
  const arr = methodArn.split("/");
  const httpMethod = arr[2];
  const newArr = methodArn.split(arr[2]);
  const httpPath = newArr[1];

  try {
    const authorization = authorizationHeader.split(" ");
    const token = authorization[1];
    const decodedJwtJson = jwtDecode(token);
    const data = decodedJwtJson.data;
    const { userType } = data;
    const requestedEndpoint = {
      method: httpMethod,
      path: httpPath,
    };

    switch (userType) {
      case "moderator":
        if (
          moderatorAllowedResources.some((endpoint) =>
            matchesEndpoint(requestedEndpoint, endpoint)
          )
        ) {
          callback(
            null,
            generatePolicy(userType, "Allow", event.methodArn, data)
          );
        } else {
          callback(
            null,
            generatePolicy(userType, "Deny", event.methodArn, data)
          );
        }
        break;
      case "reviewer":
        if (
          reviewerAllowedResources.some((endpoint) =>
            matchesEndpoint(requestedEndpoint, endpoint)
          )
        ) {
          callback(
            null,
            generatePolicy(userType, "Allow", event.methodArn, data)
          );
        } else {
          callback(
            null,
            generatePolicy(userType, "Deny", event.methodArn, data)
          );
        }
        break;
      default:
        callback(null, "Unauthorized");
        break;
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

const generatePolicy = (principalId, effect, resource, data) => {
  const { _id, userType } = data;
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
    authResponse.context = {
      _id,
      userType,
    };
  }
  return authResponse;
};

const matchesEndpoint = (requestedEndpoint, allowedEndpoint) => {
  const pathMatch = requestedEndpoint.path.match(allowedEndpoint.path);
  return pathMatch && requestedEndpoint.method === allowedEndpoint.method;
};
