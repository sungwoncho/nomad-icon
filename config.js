module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'test':
      return {
        mongo_url: 'mongodb://localhost/nomad-icon-test'
      };
    case 'development':
      return {
        mongo_url: 'mongodb://localhost/nomad-icon-development'
      };
    case 'production':
      return {
        mongo_url: 'mongodb://127.0.0.1/nomad-icon'
      };
    default:
      return;
  }
};
