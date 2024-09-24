import prisma from "../lib/prisma.js"; 

export const postMessage = async (req, res) => {
    const { name, email, message } = req.body;
  
    // Validate input fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Create a new message record in the database
      const newMessage = await prisma.message.create({
        data: {
          name,
          email,
          message,
        },
      });
  
      // Respond with success message and new message data
      res.status(201).json({ message: 'Message sent successfully!', newMessage });
    } catch (error) {
      // Log the error to the console
      console.error('Error sending message:', error);
  
      // Respond with a 500 error
      res.status(500).json({ message: 'Error sending message', error: error.message });
    }
  };

export const getMessage = async (req, res) => {
    try {
      const messages = await prisma.message.findMany();
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
};
