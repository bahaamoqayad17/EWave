const factory = require("./FactoryHandler");
const Video = require("../Models/Video");

exports.index = factory.index(Video);
exports.create = factory.create(Video);
exports.show = factory.show(Video);
exports.update = factory.update(Video);
exports.delete = factory.delete(Video);
