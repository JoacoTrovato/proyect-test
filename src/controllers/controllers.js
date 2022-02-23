const DB = require('../db')

const getAllTareas = async (req, res, next) => {
    try {
        const allTareas = await DB.query("SELECT * FROM tareas");
        res.json(allTareas.rows);
    } catch(error) {
        next(error);
    }
};

const getTarea = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await DB.query("SELECT * FROM tareas WHERE id = $1", [id]);
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Tarea no Encontrada"
            });
        }
        res.json(result.rows[0]);
    } catch(error) {
        next(error);
    }
};

const createTareas = async (req, res, next) => {
    const { title, description } = req.body
    try{
        const result = await DB.query(
            "INSERT INTO tareas (title, description) VALUES ($1, $2) RETURNING *",
            [title, description
        ]);
        res.json(result.rows[0]);
    } catch(error){
        next(error);
    }
};

const deleteTareas = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await DB.query("DELETE FROM tareas WHERE id = $1", [id]);
        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Tarea no Encontrada"
        });
        }
        return res.sendStatus(204); 
    } catch(error) {
        next(error);
    }
};

const updateTareas = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await DB.query(
            "UPDATE tareas SET title = $1, description = $2 WHERE id = $3 RETURNING *",
            [title, description, id]
        );
        if(result.rows.length === 0){
            return res.status(404).json({
                message: "Tarea no Encontrada"
            });
        };
        return res.json(result.rows[0]);
    } catch(error) {
        next(error);
    }
};

module.exports = {
    getAllTareas,
    getTarea,
    createTareas,
    deleteTareas,
    updateTareas
};