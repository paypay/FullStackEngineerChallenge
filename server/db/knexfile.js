module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/revyou.db"
    },
    useNullAsDefault: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: __dirname + "/revyou.db"
    },
    useNullAsDefault: true
  }
};
