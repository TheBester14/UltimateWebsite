const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Create a new Express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection string and client setup
const uri =
  "mongodb+srv://adnane552:syyhoPq5h1WUr4PW@ultimate-website.khl5l93.mongodb.net/?retryWrites=true&w=majority&appName=ultimate-website";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

// Connect to MongoDB
connectToMongoDB();

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token.split(" ")[1], "secret_key", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route to fetch all users (for admin purposes)
app.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await client
      .db("signup")
      .collection("users")
      .find({}, { projection: { email: 1, username: 1, timeSpent: 1 } })
      .toArray();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to register a new user
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await client
      .db("signup")
      .collection("users")
      .insertOne({ email, username, password: hash, timeSpent: 0 });
    res.send({ message: "User registered" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to login
app.post("/login", async (req, res) => {
  console.log("Login route hit"); // Debugging
  const { emailOrUsername, password } = req.body;
  try {
    console.log("Searching for user"); // Debugging
    const user = await client
      .db("signup")
      .collection("users")
      .findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });
    if (!user) {
      console.log("User not found"); // Debugging
      return res.status(400).send({ message: "User not found" });
    }
    console.log("User found, checking password"); // Debugging
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials"); // Debugging
      return res.status(400).send({ message: "Invalid credentials" });
    }
    console.log("Password matched, generating token"); // Debugging
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "secret_key",
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated token:", token);
    res.send({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send(err);
  }
});

// Route to update time spent
app.post("/track-time", authenticateToken, async (req, res) => {
  const { timeSpent } = req.body;
  const userId = new ObjectId(req.user.id);

  try {
    const result = await client
      .db("signup")
      .collection("users")
      .updateOne({ _id: userId }, { $inc: { timeSpent: timeSpent } });

    if (result.modifiedCount === 1) {
      console.log(`Tracking time for user ${userId}: ${timeSpent} minutes`); // Debugging
      res.json({ success: true, message: "Time tracked successfully" });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error tracking time:", err);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// Route to get time spent
app.get("/get-time-spent/:id", authenticateToken, async (req, res) => {
  const userId = new ObjectId(req.params.id);
  console.log(`Fetching time spent for user ID: ${userId}`); // Debugging

  try {
    const user = await client
      .db("signup")
      .collection("users")
      .findOne({ _id: userId }, { projection: { timeSpent: 1 } });

    if (user) {
      res.json({ totalTimeSpent: user.timeSpent || 0 });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error fetching time spent:", err);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
