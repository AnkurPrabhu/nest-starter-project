module.exports = {
  development: {
    dialect: 'mysql',
    host: 'localhost',
    port: 1433,
    username: 'SA',
    password: 'Str0ngPa$$w0rd',
    database: 'test',
  },
  test: {
    dialect: 'mysql',
    host: 'localhost',
    port: 1433,
    username: 'root',
    password: 'root',
    database: 'test',
  },
  production: {
    dialect: 'mysql',
    host: 'localhost',
    port: 1433,
    username: 'root',
    password: 'root',
    database: 'test',
  },
};
