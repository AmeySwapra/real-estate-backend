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


export const editService = async (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;

    try {
        const updateService  = await prisma.service.update({
            where: {id : id},
            data : {
               name,
               description,
               image
            },
        });
        res.status(200).json(updateService)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


export const dropService = async (req, res) => {

    const { id } = req.params;

    try {
         await prisma.service.delete({
            where : {id : id}
        });

        res.status(204).send()
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}