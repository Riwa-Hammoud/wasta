const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user")
const internshipRoute = require("./routes/internship")
const bookMarkRoute = require("./routes/bookmark")
const cors = require('cors');
const { Authorization }=require("./routes/authHelper")


// Allow requests from all origins
app.use(cors());

// To allow requests only from specific origins:
// app.use(cors({
//     origin: 'http://your-flutter-app-domain.com'
// }));

dotenv.config();
// to get variables from .env file => process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('db connected'))
.catch((err)=> { console.log(err) });

app.use(express.json())     
app.use("/api/", authRoute)
app.use("/api/users", userRoute)
app.use("/api/internships", internshipRoute)
app.use("/api/bookmarks", bookMarkRoute)


app.get('/api/linkedin/authorize', (req,res)=>{
    return res.redirect(Authorization());
});
app.get('/api/linkedin/redirect', async(req, res)=>{
    return res.json(Redirect(req.query.code));
});


//localhost:5001/api/users/id`

app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))