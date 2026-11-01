const db = require("../database/database");

const receiveWebhook = (req, res) => {
    try {
        // Get the unique webhook ID from the URL
        const webhookId = req.params.id;

        // Check whether this webhook exists
        const webhook = db.prepare(
            "SELECT * FROM webhooks WHERE id = ?"
        ).get(webhookId);

        if (!webhook) {
            return res.status(404).json({
                message: "Webhook not found"
            });
        }

        // Generate a unique event ID
        const eventId = require("crypto").randomUUID();

        // Store the incoming request
        const statement = db.prepare(`
            INSERT INTO events (id, webhook_id, method, headers, body)
            VALUES (?, ?, ?, ?, ?)
        `);

        statement.run(
            eventId,
            webhookId,
            req.method,
            JSON.stringify(req.headers),
            JSON.stringify(req.body)
        );

        res.status(201).json({
            message: "Webhook event received successfully!",
            eventId: eventId
        });

    } catch (error) {
        console.error("Error receiving webhook:", error);

        res.status(500).json({
            message: "Failed to receive webhook event"
        });
    }
};

// Get all events for a particular webhook
const getWebhookEvents = (req, res) => {
    try {
        const webhookId = req.params.id;

        // Check whether the webhook exists
        const webhook = db.prepare(
            "SELECT * FROM webhooks WHERE id = ?"
        ).get(webhookId);

        if (!webhook) {
            return res.status(404).json({
                message: "Webhook not found"
            });
        }

        // Fetch all events for this webhook
        const events = db.prepare(
            "SELECT * FROM events WHERE webhook_id = ? ORDER BY created_at DESC"
        ).all(webhookId);

        res.status(200).json({
            message: "Events fetched successfully!",
            totalEvents: events.length,
            events: events
        });

    } catch (error) {
        console.error("Error fetching events:", error);

        res.status(500).json({
            message: "Failed to fetch webhook events"
        });
    }
};

module.exports = { receiveWebhook, getWebhookEvents };