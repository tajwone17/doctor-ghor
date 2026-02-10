import express from "express";
import cors from "cors";
import 'dotenv/config';


//app config
const app = express(); 
const port = process.env.PORT || 4000; 

//middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

//listen
app.listen(port, () => console.log(`Server running on port ${port}`));