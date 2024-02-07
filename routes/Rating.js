const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Endpoint for users to submit ratings
router.post('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const { rating } = req.body;

    const userId = req.user._id; 

    // Find the event by ID
    const event = await Event.findById(eventId);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already rated the event
    if (event.ratings.some((r) => r.user.toString() === userId.toString())) {
      return res.status(400).json({ message: 'You have already rated this event' });
    }

    // Add the new rating
    event.ratings.push({ user: userId, rating });
    await event.save();

    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// to get avg rating
router.get('/average-rating/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;

        // Find the event by ID
        const event = await Event.findById(eventId);

        // Check if the event exists
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Calculate average rating
        const ratings = event.ratings.map((r) => r.rating);
        const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;

        res.json({ averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
