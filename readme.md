
# Crud Controller

CrudController is a simple Node.js module that provides a base class for creating CRUD controllers with Express.js.


## Usage

```javascript
// index.js

const express = require('express');
const mongoose = require('mongoose');
const restCrudController = require('rest-crud');
const Task = require('./models/Task');

// Connect to MongoDB (replace with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017');

// Instantiate the restCrudController for tasks
const TaskController = new restCrudController(Task);

// Create an Express app and use the TaskController's router
const app = express();
app.use(express.json());
app.use('/tasks', TaskController.router);

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

```

```javascript
// Task schema
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
```


## API Reference

#### Get all Tasks

```http
  GET /tasks/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get a task

```http
  GET /tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create a task

```http
  POST /tasks/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

Pass all parameters of the item to create to `request.body`.

#### Update a task

```http
  PUT /tasks/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |

Pass all parameters of the item to update to `request.body`.

#### Delete a task

```http
  DELETE /tasks/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |


