const Brand = require('../models/brand.model');


const brandController = {
    getAllBrands: async (req, res) => {
        try {
            const brands = await Brand.getAll();
            res.json(brands);
        } catch (error) {
            console.error('Error getting all: ', error);
            res.status(500).json({ message: 'Error' });
        }
    }, getById: async (req, res) => {
        try {
            const brand = await Brand.getById(req.params.id)
            if(brand){
                res.json(brand);
            }else{
                res.status(404).json({message: 'Brand not found!'});
            }
        } catch (error) {
            console.error('Error: ',error);
            res.status(500).json({message: 'Failed'});
        }
    }
}

module.exports = brandController;