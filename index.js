const express = require("express");
const con = require("./dbConnect");
const addViewRoute = require("./Routes/addView");
const cors = require("cors");

const app = express();

con.connect();

app.set("trust proxy", true);

app.use(
  cors({
    origin: [
      "https://harsh-gajjar.netlify.app/",
      "https://harsh-gajjar.netlify.app",
    ],
  })
);

app.use("/profile", addViewRoute);

app.listen(4000, () => {
  console.log("Listening on port 4000!");
});
