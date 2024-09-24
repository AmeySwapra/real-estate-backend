import prisma from "../lib/prisma";


export const postMessage = async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      const newMessage = await prisma.message.create({
        data: { name, email, message },
      });
      res.status(201).json({ message: 'Message sent successfully!', newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending message' });
    }
  }

  export const getMessage = async (req, res) => {
    try {
      const messages = await prisma.message.findMany();
      res.json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  }