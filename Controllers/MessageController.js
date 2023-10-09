const factory = require("./FactoryHandler");
const Message = require("../Models/Message");

exports.index = factory.index(Message);
exports.create = factory.create(Message);
exports.show = factory.show(Message);
exports.update = factory.update(Message);
exports.delete = factory.delete(Message);
