const express = require('express');
const router = express.Router();
const tasks = require('../task.json');

// Obtener todas las tareas 
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// Obtener una tarea por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const task = tasks.find(t => t.id === id);

    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Crear una nueva tarea
router.post('/', (req, res) => {
    const body = req.body;

    if (!body || !body.id || !body.name) {
        return res.status(400).send('La tarea debe tener un ID y un nombre');
    }

    tasks.push(body);
    res.status(201).send('Tarea creada exitosamente');
});

// Editar una tarea existente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    let taskFound = false;

    tasks.forEach(task => {
        if (task.id === id) {
            taskFound = true;
            task.name = body.name || task.name;
            task.description = body.description || task.description;
        }
    });

    if (taskFound) {
        res.status(200).send('Tarea actualizada exitosamente');
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

// Eliminar una tarea por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(200).send('Tarea eliminada exitosamente');
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

module.exports = router;
