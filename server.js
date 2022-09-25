const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./controllers/authRoutes');
const classRoutes = require('./controllers/classRoutes');
const fileRoutes = require('./controllers/filesRoutes');
const cors = require('cors');

const port = 3007;
const app = express();

app.use(cors())

connectDB();
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/file', fileRoutes);


// listening to port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})