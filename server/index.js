const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.get("/api/employees", async (req, res) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json"
    );
    const employeesData = response.data;
    res.json(employeesData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
