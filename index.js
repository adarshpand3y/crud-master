const express = require('express');

class RestCrud {
  constructor(model) {
    this.model = model;
    this.router = express.Router();

    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create
    this.router.post('/', async (req, res) => {
      try {
        const newItem = await this.model.create(req.body);
        res.status(201).json(newItem);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error creating item' });
      }
    });

    // Read (All)
    this.router.get('/', async (req, res) => {
      try {
        const items = await this.model.find();
        res.json(items);
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error fetching items' });
      }
    });

    // Read (One)
    this.router.get('/:id', async (req, res) => {
      try {
        const item = await this.model.findById(req.params.id);
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error fetching item' });
      }
    });

    // Update
    this.router.put('/:id', async (req, res) => {
      try {
        const updatedItem = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedItem) {
          res.json(updatedItem);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error updating item' });
      }
    });

    // Delete
    this.router.delete('/:id', async (req, res) => {
      try {
        const deletedItem = await this.model.findByIdAndDelete(req.params.id);
        if (deletedItem) {
          res.json(deletedItem);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Error deleting item' });
      }
    });
  }
}

module.exports = RestCrud;