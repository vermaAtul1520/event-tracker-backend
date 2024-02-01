const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const User = require('../models/Users');

// Create a new ticket
router.post('/create', async (req, res) => {
    const user = req.user;
    let userID = user._id;

    try {
        const { eventID, ticketType, price, quantity } = req.body;
        
        const event = await Event.findById(eventID);
        
        if (!event || !user) {
            return res.status(404).json({ message: 'Event or user not found' });
        }

        // Create a new ticket
        const newTicket = new Ticket({
            event: eventID,
            user: userID,
            ticketType,
            price,
            quantity
        });

        // Save the ticket to the database
        await newTicket.save();

        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all tickets for a specific user
router.get('/all', async (req, res) => {
    try {
        const user = req.user;
        let userID = user._id;

        const tickets = await Ticket.find({ user: userID }).populate('event');
        res.status(200).json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get ticket related to any events using events id
router.get('/event/:eventID', async (req, res) => {
    try {
        const eventID = req.params.eventID;
        
        // Find all tickets related to the specified event
        const tickets = await Ticket.find({ event: eventID }).populate('user');

        res.status(200).json({ message: 'Ticket for event', ticket: tickets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get a specific ticket using ticket id
router.put('/:ticketID', async (req, res) => {
    try {
        const ticketID = req.params.ticketID;
        const userID = req.user._id; // Assuming you have middleware to authenticate and set the user ID in req.user

        // Check if the ticket exists and is associated with the user
        const ticket = await Ticket.findOne({ _id: ticketID, user: userID });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized access' });
        }

        // Update ticket details
        ticket.ticketType =  req.body.ticketType || ticket.ticketType ;
        ticket.price = req.body.price || ticket.price;
        ticket.quantity = req.body.quantity || ticket.quantity;

        // Save the updated ticket
        await ticket.save();

        res.status(200).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a ticket by its ID
router.delete('/:ticketID', async (req, res) => {
    try {
        const ticketID = req.params.ticketID;
        const userID = req.user._id; 
        

        // Find the ticket and check if it belongs to the user
        const deletedTicket = await Ticket.findOneAndDelete({ _id: ticketID, user: userID });

        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found for this id' });
        }

        // Remove the ticket from the database
        // await Ticket.deleteOne({ _id: ticketID, user: userID });

        res.status(204).end({message:"Sucessfullyy delted"}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
