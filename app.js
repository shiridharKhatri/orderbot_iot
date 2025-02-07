const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Allow CORS for Socket.IO connections
const io = socketIo(server, {
  cors: {
    origin: ["http://127.0.0.1:5501", "http://localhost:5173", "https://iot-production-df7c.up.railway.app", "https://shiribiswas.netlify.app"], // The origin where your frontend is running
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

const port = 3000;
app.use(express.json());
app.use(cors({
  origin: ["http://127.0.0.1:5501", "http://localhost:5173", "https://iot-production-df7c.up.railway.app", "https://shiribiswas.netlify.app"], // Allow the frontend's origin
  methods: "GET, POST",
  credentials: true
}));

app.post('/api/seatstatus', (req, res) => {
  const table1Status = req.body.table1_status;
  const table2Status = req.body.table2_status;
  const table3Status = req.body.table3_status;
  
  console.log('Table 1 Status:', table1Status);  // Check server log
  console.log('Table 2 Status:', table2Status);  // Check server log
  console.log('Table 3 Status:', table3Status);  // Check server log
  
  // Emit the status change to all connected clients
  io.emit('seatStatusUpdate', { table1Status, table2Status, table3Status });
  
  res.send({ message: 'Status received' });
});

// Listen for incoming connections from clients
io.on('connection', (socket) => {
  console.log('A client connected');
  
  // Send the current status to the new client upon connection
  socket.emit('seatStatusUpdate', {
    table1Status: 'available',  // Example initial status
    table2Status: 'available',  // Example initial status
    table3Status: 'available'   // Example initial status
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
