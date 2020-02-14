const Shipment = require('../models/shipment.model.js');

// Create and Save a new Shipment
exports.create = async(req, res) => {
  const { name, origin, destination, assignee, orderStatus, pickupDate, deliveryDate } = req.body;

  // Validate request
  if (!name) {
    return res.status(400).send({
      message: "Shipment content can not be empty"
    });
  }
      
  // Create a Shipment
  const shipment = new Shipment({
    name,  origin, destination, assignee, pickupDate, deliveryDate,
    orderStatus: !assignee ? 1 : orderStatus,
  });

  // Save shipment in the database
  try {
    const savedShipment = await shipment.save()
    
    res.send(savedShipment);
  }
  catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Shipment."
    });
  };
};

// Retrieve and return all shipments from the database.
exports.findAll = async(req, res) => {
  try { 
    const shipments = await Shipment.find();            
    res.send(shipments);
  }
  catch(err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while retrieving shipments."
      });
  };
};

// Retrieve and return all shipments from the database.
exports.findByCreator = async(req, res) => {
  const assignee = parseInt(req.params.id);

  // Validate request
  if (!assignee || isNaN(assignee)) {
    return res.status(400).send({
      message: "assignee id can not be empty"
    });
  }

  let query = {}
  if (assignee) {
    query = { assignee };
  }

  try { 
    const shipments = await Shipment.find(query);            
    res.send(shipments);
  }
  catch(err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while retrieving shipments."
      });
  };
};

// Find a single shipment with a id
exports.findOne = async(req, res) => {
    try {
      const id = req.params.id;
      const shipment = await Shipment.findById(id);

      if (!shipment) {
        return res
          .status(404)
          .send({
            message: `shipment not found with id ${id}`
          });
      }
         
      res.send(shipment);
    }
    catch(err) {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({
            message: `shipment not found with id ${id}`
          });
      }

      return res
        .status(500)
        .send({
          message: `Error retrieving shipment with id ${id}`
        });
    };
};

const getOrderStatus = (assignee, pickupDate, deliveryDate) => {
  if (!assignee) {
    return 1;
  }

  if (!pickupDate) {
    return 2;
  }

  if (!deliveryDate) {
    return 3;
  }

  return 4;
}

// Update a shipment identified by the shipmentID in the request
exports.update = async(req, res) => {
  const { name, assignee, pickupDate, deliveryDate } = req.body;
  const id = req.params.id;
  // Validate Request
  if (!name) {
    return res.status(400).send({
      message: "Shipment name can not be empty"
    });
  }

  try {    
    // Find shipment and update it with the request body
    const shipment = await Shipment.findByIdAndUpdate(id, {    
        name,      
        assignee,
        orderStatus: getOrderStatus(assignee, pickupDate, deliveryDate),
        pickupDate,    
        deliveryDate
    }, { new: true }); 

    if (!shipment) {
      return res.status(404).send({
        message: `shipment not found with id ${id}`
      });
    }

    res.send(shipment);
  }
  catch(err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `shipment not found with id ${id}`
      });
    }

    return res.status(500).send({
      message: `Error updating shipment with id ${id}`
    });
  }
};

// Delete a record with the specified shipmentID in the request
exports.delete = async(req, res) => {
    const { id } = req.params;

    try {
      const shipment = await Shipment.findByIdAndRemove(id)

      if (!shipment) {
        return res.status(404).send({
          message: `shipment not found with id ${id}`
        });
      }

      res.send({ message: "shipment deleted successfully!" });
    }    
    catch(err) {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `shipment not found with id ${id}`
        });
      }

      return res.status(500).send({
        message: `Could not delete shipment with id ${shipmentID}`
      });
    };
};
