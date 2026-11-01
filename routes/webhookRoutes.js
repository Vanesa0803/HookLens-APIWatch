const express = require("express");
const {
    createWebhook,
    getAllWebhooks
} = require("../controllers/webhookController");

const router = express.Router();

// Create a new webhook
router.post("/", createWebhook);

// Get all created webhooks
router.get("/", getAllWebhooks);

module.exports = router;