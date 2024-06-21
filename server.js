const jsonServer = require('json-server');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create a JSON Server instance
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Initialize multer with the storage engine
const upload = multer({ storage });

// Apply default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom route for file upload
server.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = `/images/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// Use default router
server.use(router);

// Start the server
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
