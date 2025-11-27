require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');


const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);


app.get('/', (req, res) => res.send('ProU Task Management API'));


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
