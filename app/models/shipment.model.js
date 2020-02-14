const mongoose = require('mongoose');

const ShipmentSchema = mongoose.Schema(
  {
    name: String,
    origin: String,
    destination: String,
    assignee: Number,
    orderStatus: Number,
    pickupDate: Date,
    deliveryDate: Date,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shipment', ShipmentSchema);
