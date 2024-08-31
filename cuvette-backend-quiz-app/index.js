const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
require('./database/quizzieConfig');
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const dashboardRoute = require('./routes/dashboard');
app.use('/api/', dashboardRoute);

const pollRouter = require('./routes/poll');
app.use('/api/create', pollRouter);

const quizRouter = require('./routes/quiz');
app.use('/api/create', quizRouter); // Called in DashboardComponent For Fetching the Created Quiz data

const deleteQuizRouter = require('./routes/quiz');
app.use('/api/delete', deleteQuizRouter);

const linkRouter = require('./routes/link'); // Adjust the path accordingly
app.use('/api/track', linkRouter);

// Start the server
const PORT = process.env.PORT || 4747;
app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`);
});
