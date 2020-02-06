const Planet = require('./model')
const requestStarWarsApi = require('../../lib/requestStartWarsApi')

module.exports = {
    async list(req, res) {
        
        await Planet.find().lean().exec()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(409).json({ error: err.message})
                res.end()
            })        
    },

    async findPanetById(req, res) {
        planetId = req.params.id

        Planet.findById({ _id: planetId}).lean().exec()
            .then(data => {
                if (data.length !== 0)
                    res.json(data)
                else
                    res.status(409).json({ error: 'Document not found'})
            })

    },

    async findPlanetByName(req, res) {
        planetName = req.params.nome

        Planet.find({ nome: planetName}).lean().exec()
            .then(data => {
                if (data.length !== 0)
                    res.json(data)
                else
                    res.status(409).json({ error: 'Document not found'})
            })
    },

    async create(req, res) {
        const planet = new Planet({ 
            nome : req.body.nome, 
            clima : req.body.clima, 
            terreno : req.body.terreno})

        await planet.save()
            .then(() => {
                res.status(200).json(planet)
            })
            .catch( err => {
                res.status(409).json({ error: err.message});
                res.end()
            })
    },

    async updateById(req, res) {
        const plantId = req.params.id

        Planet.findByIdAndUpdate(plantId, req.body)
            .then(() => {
                const newPlanet = await this.findPanetById(planetId)
                res.json(newPlanet)
            })

    },

    async delete(req, res) {
        planetName = req.params.nome

        Planet.deleteOne({ nome: planetName }).exec() 
            .then(data => {
                if (data.deletedCount != 0)
                    res.json({ 
                        success: true,
                        deletedCount: data.deletedCount })
                else 
                    res.json({ 
                        success: true,
                        deletedCount: data.deletedCount })
            })
    }
}