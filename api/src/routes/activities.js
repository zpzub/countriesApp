const { Router } = require('express');
const router = Router();
const {Activities, Countries} = require('../db.js')
//const cors = require('cors')
const { Op } = require('sequelize')

//router.use(cors());

router.get('/', async (req, res) => {
    const country = req.query.country;

    if(country){
        try {
            let nameRequest = await Activities.findAll({
               
                include:{
                    model: Countries,
                    where: {
                        name: country,
                    }
                }
            }
                
            );
            nameRequest.length
            ? res.status(200).send(nameRequest)
            : res.status(200).send('Activity not found')
        } catch (error) {
            console.log(error)
        }

        

    }else{

    try {
        let activities = await Activities.findAll();
        res.status(200).send(activities);
      } 
    catch (errors) {
        res.status(500).send("Error");
    }
}
    
      
})

router.put('/',  (req, res) => {
    res.send('soy la ruta put')
})

router.delete('/',  (req, res) => {
    res.send('soy la ruta delete')
})

router.post('/add', async (req, res, next) => {
    try{
    // traemos la data del form 
    const {name, country, difficulty, duration, season} = req.body;

    // Creo la actividades
        const newActivity = await Activities.create({
            name, country, difficulty, duration, season
        });
    
    // voy por el array de countries para generar sus relaciones
    country.forEach(async (element) => {
        let actCountries = await Countries.findOne({
          where: {
            name: element,
  }, });
        await newActivity.addCountries(actCountries);
      });

      res.status(200).send('Activity created successfully!');
    } catch (error) {
        console.log(error)
        res.status(500).send('Cannot create activity');
    }

})

module.exports = router;