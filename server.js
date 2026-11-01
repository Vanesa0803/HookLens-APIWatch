const express = require("express");
const db = require("./database/database");
const webhookRoutes = require("./routes/webhookRoutes");
const { receiveWebhook, getWebhookEvents } = require("./controllers/eventController");

const app = express();
const PORT = 5001;

// Middleware to read incoming JSON
app.use(express.json());

// Webhook creation route
app.use("/api/webhooks", webhookRoutes);

// Receive incoming webhook events
app.post("/webhooks/:id", receiveWebhook);

// Fetch all events for a webhook
app.get("/webhooks/:id/events", getWebhookEvents);

console.log("SQLite database connected successfully!");

// Basic test route
app.get("/", (req, res) => {
    res.send("HookLens Lite Backend is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});