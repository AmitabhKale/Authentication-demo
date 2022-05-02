const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes')

// Initialize
const app = express();

// Connection String
connectDB()


app.get('/', (req,res) => {
    res.send("It Wordked...")
})

// body parser middleware - [This must be before Routes middleware |Sequence really matters here|]
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/', userRoutes);


// Error Handler middleware
app.use(errorHandler);

// Server Port 
app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
})