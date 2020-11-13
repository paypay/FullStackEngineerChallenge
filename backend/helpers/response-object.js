// TODO artificial response bottleneck to provide expectable and reliable http-responses
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
