const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.Route");
const employeeRoutes = require("./routes/employee.route")
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("API Running"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
