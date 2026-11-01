const crypto = require("crypto");
const db = require("../database/database");



// Create a new webhook
const createWebhook = (req, res) => {
    try {
        const id = crypto.randomUUID();

        const name = req.body.name || "My Webhook";

        const statement = db.prepare(
            "INSERT INTO webhooks (id, name) VALUES (?, ?)"
        );

        statement.run(id, name);

        res.status(201).json({
            message: "Webhook created successfully!",
            webhook: {
                id: id,
                name: name,
                url: `http://localhost:5001/webhooks/${id}`
            }
        });

    } catch (error) {
        console.error("Error creating webhook:", error);

        res.status(500).json({
            message: "Something went wrong while creating the webhook."
        });
    }
};

// Get all created webhooks
const getAllWebhooks = (req, res) => {
    try {
        const webhooks = db.prepare(
            "SELECT * FROM webhooks ORDER BY created_at DESC"
        ).all();

        res.status(200).json({
            message: "Webhooks fetched successfully!",
            totalWebhooks: webhooks.length,
            webhooks: webhooks
        });

    } catch (error) {
        console.error("Error fetching webhooks:", error);

        res.status(500).json({
            message: "Failed to fetch webhooks"
        });
    }
};

module.exports = { createWebhook, getAllWebhooks };