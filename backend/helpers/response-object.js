module.exports = (
  status = 200,
  message = `Generic api response`,
  data = {}
) => {
  return {
    data: data,
    output: {
      statusCode: status,
      payload: {
        statusCode: status,
        message: message
      }
    }
  };
};
