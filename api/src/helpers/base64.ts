type Data = string | number;

export const base64Encode = (data: Data) => {
  if (data) {
    return Buffer.from(String(data)).toString("base64");
  }
  return null;
};

export const base64Decode = (data: Data) =>
  Buffer.from(String(data), "base64").toString("ascii");
