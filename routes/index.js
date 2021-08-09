module.exports = (app) => {
  app.use("/", require("./base.routes.js"));
  app.use("/characters", require("./characters.routes"));
};
