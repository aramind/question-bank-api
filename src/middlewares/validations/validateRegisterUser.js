const sendResponse = require("../../utils/sendResponse");
const registerUserSchema = require("./registerUserSchema");

const validateRegisterUser = (schema) => (req, res, next) => {
  if (schema?.body) {
    const { value: validatedBody, error: bodyError } =
      registerUserSchema.body.validate(req?.body, { stripUnknown: true });
    if (bodyError) {
      console.log("ERROR", bodyError);
      return sendResponse.failed(res, bodyError, {}, 400);
    }
    console.log("VALIDATED", validatedBody);
    req.body = validatedBody;
  }

  if (schema?.queryParams) {
    const { value: validatedQueryParams, error: queryParamsError } =
      registerUserSchema.queryParams.validate(req?.query);
    if (queryParamsError) {
      console.log("QP ERROR", queryParamsError);
      return sendResponse.failed(res, queryParamsError, {}, 400);
    }
    console.log("VALIDATED", validatedQueryParams);
    req.query = validatedQueryParams;
  }

  if (schema?.reqParams) {
    const { value: validatedReqParams, error: reqParamsError } =
      registerUserSchema.reqParams.validate(req?.params, {
        stripUnknown: true,
      });
    if (reqParamsError) {
      console.log("RP ERROR", reqParamsError);
      return sendResponse.failed(res, reqParamsError, {}, 400);
    }
    console.log("VALIDATED", validatedReqParams);
    req.params = validatedReqParams;
  }

  console.log("VALIDATION PASSED"), next();
};
module.exports = validateRegisterUser;
