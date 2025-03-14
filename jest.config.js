// jest.config.js
module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/config/",
        "/bin/",
        "/locales/",
        "/tests/",
        "/app.js",
        "/models/index.js",
        "/routes/api/routes.js"
    ],
  };