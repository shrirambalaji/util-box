const mockRes = {
  status: 200,
  body: {
    message: "Hello"
  },
  json: function() {
    return this.body;
  },
  text: function() {
    return JSON.stringify(this.body);
  }
};

module.exports = {
  mockRes
};
