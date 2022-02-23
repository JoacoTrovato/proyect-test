const { Router } = require('express');
const {
    getAllTareas,
    getTarea,
    createTareas,
    deleteTareas,
    updateTareas
} = require('../controllers/controllers');

const router = Router();

router.get('/tareas', getAllTareas);

router.get('/tareas/:id', getTarea);

router.post('/tareas', createTareas);

router.delete('/tareas/:id', deleteTareas);

router.put('/tareas/:id', updateTareas);

module.exports = router;