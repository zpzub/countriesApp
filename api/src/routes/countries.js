const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize')
const { Countries, Activities, CountriesActivities } = require('../db.js')
const axios = require('axios')

// let checkDB = await Countries.findAll({
//     include: {
//         model: Activities,
//     },
// });

//Guardo la data de la API en JSON
const countriesApi = async () => {
    
        const countriesAddress = await axios.get('https://restcountries.com/v3/all')
        const countries = await countriesAddress.data.map((country) =>{
            return {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags[1],
                continent: country.continents[0],
                capital:
                country.capital != null ? country.capital : "Capital not available",
                subregion: country.subregion,
                area: country.area,
                population: country.population,
            }
    
        })
        return countries;

};

router.get('/', async (req, res) => {
    // Traemos el fetch de la API
    const mycountries = await countriesApi();

    // Guardo el nombre por query
    const name = req.query.name;
    const activity = req.query.activity;
    
    //console.log(mycountries)

    try {
        //Si tiene data, traemos la DB
        let databaseCountries = await Countries.findAll({
            include: {
                model: Activities,
            },
        });
        //si esta vacia, la completamos desde la API
        if(!databaseCountries.length){
        await Countries.bulkCreate(mycountries)
        }
    } catch (error) {
        console.log(error)
    }

    //Si hay un name pedido por query
    if(name){
        let nameRequest = await Countries.findAll({
            where:{
                name: {
                    [Op.iLike]: "%" + name + "%",
                },
            },
        });
        nameRequest.length
        ? res.status(200).send(nameRequest)
        : res.status(404).send('Country not found')

    }else if (req.query.order) {
            try {
              let country = await Countries.findAll({
                order: [["population", req.query.order]],
                include: {
                  model: Activities,
                },
        });
              res.status(200).send(country);
            } catch (error) {
              res.status(500).send("Error");
            }
    } 
    else if (req.query.activity) {
    try {
      let activityByCountry = await Countries.findAll({
        include: {
          model: Activities,
          where: {
              name: {[Op.iLike]: "%" + activity + "%",}
          }
        },
});
      res.status(200).send(activityByCountry);
    } catch (error) {
      res.status(500).send("Error");
    }
} 
    else {
            let full = await Countries.findAll({
              include: {
                model: Activities,
        }, });
            res.status(200).send(full);
          }
        });



router.get('/:id', async (req, res) =>{
    const {id} = req.params

    try{
    const countriesById = await Countries.findByPk(id.toUpperCase(), {
        include:{
            model: Activities,
        }
    })
    res.status(200).send(countriesById)
    } catch (error){
        console.log(error)
        res.status(500).send('Country not found')
    }

})


router.get('/:id', async (req, res) =>{

    const {id} = req.params

    try{
    const countriesById = await Countries.findByPk(id.toUpperCase(), {
        include:{
            model: Activities,
        }
    })
    res.status(200).send(countriesById)
    } catch (error){
        console.log(error)
        res.status(500).send('Country not found')
    }

})



router.delete('/',  (req, res) => {
    res.send('Im DELETE')
})

router.put('/',  async (req, res) => {
    res.send('Im PUT')
})








//OLDER TRIES
// router.get('/countries',  (req, res) => {
//     //let countriesAPIpromise = axios.get('https://restcountries.com/v3/all')
//     let countriesDBpromise = Countries.findAll()

//     Promise.all([
//         //countriesAPIpromise, 
//         countriesDBpromise 
//     ])

//     .then((response) =>{
//         const [countriesAPI, countriesDB] = response;
//         let filteredCountriesAPI = countriesAPI.data.map((country) =>{
//             return{
//                 name: country.name.common,
//                 flag: country.flags[1],
//                 continent: country.continents
//             }
//         })
//         let allCountries = [...filteredCountriesAPI, ...countriesDB]
//         res.send(allCountries);
//     })
//     .catch(function (error) {
//         console.log(error);
//       })

// })



// ****** OLDER GET BY NAME
// router.get('/c', async (req, res) => {
//     try{
//     let name = req.query.name
//     //console.log(req.params)
//         let countryAPIpromise = await axios.get('https://restcountries.com/v3/name/' + name);
//         let countryDBpromise = Countries.findAll({
//             where:{name: name}
//         })

//         Promise.all([
//             countryAPIpromise, 
//             countryDBpromise 
//         ])
//         .then((response) =>{
//             const [countryAPIpromise, countryDBpromise] = response;
//             let filteredCountriesAPI = countryAPIpromise.data.map((country) =>{
//                 return{
//                     name: country.name.common,
//                     flag: country.flags[1],
//                     continent: country.continents
//                 }
//             })
//             let myCountry = [...filteredCountriesAPI, ...countryDBpromise]
//             //console.log(myCountry)
//             res.send(myCountry)
//         })

        

//         // Promise.all([countriesAPIpromise2, countriesDBpromise])
//         // .then((response) =>{
//         //     const [countriesAPI, countriesDB] = response;
//         //     let filteredCountriesAPI2 = countriesAPI.map((country) =>{
//         //         return{
//         //             name: country.name.common,
//         //             flag: country.flags[1],
//         //             continent: country.continents}
//         //         });
//         //     let allCountries = [...filteredCountriesAPI2, ...countriesDB]
//         //     console.log(allCountries)
//         //     res.send(allCountries)
//         //})
//     }
//     catch(e){
//         res.send(e)
//     }
// })



//***** OLDER TO DATABASE */
// router.post('/todb2',  (req, res) => {
//     axios.get('https://restcountries.com/v3/all')
//     .then((response) =>{
//         let answer = []
//         let rta = response.data
//         rta.forEach(country =>{
//             answer.push(
//                    {"id": country.cca3, "name": country.name.common, "flags": country.flags[1], "region": country.region, "capital": country.capital[0], "area": country.area, "population": country.population} )
//                 })
//                 console.log(answer)
//         async function saveDB (){ 
//             await Countries.bulkCreate(answer).then(res.json(answer))
//         }
//         saveDB();
//         }) 
//     })
    
    
// **** OLDER ROUTES





module.exports = router;