const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyzeRoute = require('./routes/analyzeRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/analyze', analyzeRoute);

// Route import
const insightsRoute = require("./routes/insightsRoute"); //TEST GEMINI
app.use("/api/insights", insightsRoute); // TEST GEMINI

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
