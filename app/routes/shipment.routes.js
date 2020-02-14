module.exports = (app) => {
  const shipments = require('../controllers/shipment.controller.js');

  // Create a new shipment
  app.post('/shipments', shipments.create);

  // Retrieve all shipments
  app.get('/shipments', shipments.findAll);

  // Retrieve all assignee's shipments
  app.get('/assignee_shipments/:id', shipments.findByCreator);

  // Retrieve a single shipment with id
  app.get('/shipments/:id', shipments.findOne);

  // Update a shipment with id
  app.put('/shipments/:id', shipments.update);

  // Delete a shipment with id
  app.delete('/shipments/:id', shipments.delete);
}
