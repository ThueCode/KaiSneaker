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
    },
    createBrand: async(req, res)=>{
        try {
            const newBrandId = await Brand.create(req.body);
            const newBrand = await Brand.getById(newBrandId);
            res.status(201).json(newBrand);
        } catch (error) {
            console.log('SQL: ',req.body); 
            
            console.error('Error: ',error);
            res.status(500).json({message: 'Error: ',error});
            
        }
    },
    updateBrand: async(req, res)=>{
        try {
            const updated = await Brand.update(req.params.id,req.body);
            if(updated){
                const updateBrand = await Brand.update(req.params.id,req.body);
                res.json(updateBrand);
            }else{
                res.status(404).json({message: 'Không tìm thấy chức vụ'})
            }
        } catch (error) {
            console.error('Error: ',error);
            res.status(500).json({message: 'Error',error});
        }
    }
}

module.exports = brandController;