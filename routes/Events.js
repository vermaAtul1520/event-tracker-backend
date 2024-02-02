// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { setCache } = require('../Middleware/RedisMiddleware');

// Route to create a new event
router.post('/create', async (req, res) => {
  try {
    // Assuming the user is authenticated, and you have access to the user ID
    const organizerId = req.user._id;

    const { title, description, date, time, location } = req.body;

    // Create a new event
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      organizer: organizerId,
    });

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all events
router.get('/all', async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    // to set data in cache for 1hour by default
    setCache(`${req.path}`, JSON.stringify(events))
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific event by ID
router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Fetch the event from the database by ID
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update an event by ID
router.put('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, description, date, time, location } = req.body;

    // Update the event in the database by ID
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, date, time, location },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete an event by ID
router.delete('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Delete the event from the database by ID
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
