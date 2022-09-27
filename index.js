const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const { response } = require('express')

app.use(cors())
app.use(express.json())

app.use(logger)

let blocks = [{
    id: 1,
    nombre: 'Bicileta estática',
    descripcion: 'Alzado',
    img: 'bloque-1',
    tags: ['casa', 'gimansio', 'deporte', 'maquina', 'clicismo']
},
{
    id: 2,
    nombre: 'Eliptica estática-2',
    descripcion: 'Alzado',
    img: 'bloque-2',
    tags: ['casa', 'gimansio', 'deporte', 'maquina', 'elíptica']
},
{
    id: 3,
    nombre: 'Cinta de correr alzado',
    descripcion: 'Alzado',
    img: 'bloque-3',
    tags: ['casa', 'gimansio', 'deporte', 'maquina', 'running', 'alzado']
},
{
    id: 4,
    nombre: 'Maquina de estiramiento alzado',
    descripcion: 'Alzado',
    img: 'bloque-4',
    tags: ['casa', 'gimansio', 'deporte', 'maquina', 'estiramiento', 'alzado']
},
{
    id: 5,
    nombre: 'Maquina de estiramiento planta',
    descripcion: 'Alzado',
    img: 'bloque-5',
    tags: ['casa', 'gimansio', 'deporte', 'maquina', 'estiramiento', 'planta']
}

]

app.get('/', (request, response) => {
    response.send('<h1>Sigue así Joaquín</h1>')
})

app.get('/blocks', (request, response) => {
    response.json(blocks)
})

app.get('/blocks/:id', (request, response) => {
    const id = Number(request.params.id)
    const block = blocks.find(block => block.id === id)
    if (block) {
        response.json(block)
    } else {
        response.status(404).end()
    }
})

app.delete('/blocks/:id', (request, response) => {
    const id = Number(request.params.id)
    blocks = blocks.filter(block => block.id !== id)
    response.status(204).end()
})

app.post('/blocks', (request, response) => {
    const block = request.body

    if (!block || !block.nombre) {
        return response.status(400).json({
            error: 'block.content is missing'
        })
    }

    const ids = blocks.map(block => block.id)
    const maxId = Math.max(...ids)

    const newBlock = {
        id: maxId + 1,
        nombre: block.nombre,
        descripcion: block.descripcion
    }
    blocks = [...blocks, newBlock]

    response.status(201).json(newBlock)
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found joaquin'
    })
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT || 3200
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
