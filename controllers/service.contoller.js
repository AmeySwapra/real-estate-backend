import prisma from "../lib/prisma.js";

export const postService = async(req, res) => {

    const {name, description, image} = req.body
    
    
    if (!name || !description || !image) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      try {
        const newService = await prisma.service.create({
            data : {
                name,
                description,
                image
            },
        });
        res.status(201).json(newService)

      } catch (error) {
        res.status(500).json({error : error.message})
        console.log(error)
      }

}



export const getServices = async (req, res) => {
    try {
      const service = await prisma.service.findMany();
      res.status(200).json(service)
    } catch (error) {
        res.status(500).json({error: error.message})
        console.log(error)
    }
}