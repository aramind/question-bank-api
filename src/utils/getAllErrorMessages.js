const getAllErrorMessages = (errorsArray) => {
  console.log(errorsArray);
  return errorsArray.map((error) => error.msg);
};
module.exports = getAllErrorMessages;
