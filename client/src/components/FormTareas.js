import { Card, CardContent, Grid, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function FormTarea() {
    
    const [tarea, setTarea] = useState({
        title: '',
        description: '',
    });

    const [cargando, setCargando] = useState(false);
    const [editando, setEditando] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setCargando(true);
 
        if(editando) {
            await fetch(`http://localhost:3001/tareas/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(tarea),
            });
        } else {
            await fetch('http://localhost:3001/tareas', {
            method: 'POST',
            body: JSON.stringify(tarea),
            headers: { 'Content-Type': 'application/json' },
        });
        }
        
        setCargando(false);
        navigate('/');
    };

    const handleChange = (e) => {
        setTarea({ ...tarea, [e.target.name]: e.target.value });
    };

    const cargarTarea = async (id) => {
        const res = await fetch(`http://localhost:3001/tareas/${id}`);
        const data = await res.json();
        setTarea({title: data.title, description: data.description});
        setEditando(true);
    }
;
    useEffect(() => {
        if(params.id) {
            cargarTarea(params.id);
        }
    }, [params.id]);

    return(
        <Grid
            container
            direction="column"
            alingItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <Card sx={{mt: 5}} style={{
                    backgroundColor: '#1e272e',
                    padding: '1rem'
                }}
                >
                    <Typography variant="5" textAlign="center" color="white">
                        {editando ? "Editar Tarea" : "Crear Tarea"}
                    </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="filled"
                                    label="Título de la Tarea"
                                    sx={{
                                        display: 'block',
                                        margin: '.5rem 0'
                                    }}
                                    name="title"
                                    value={tarea.title}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: "white"} }}
                                    InputLabelProps={{ style: { color: "white"} }}
                                />
                                <TextField
                                    variant="filled"
                                    label="Escribe la Descripción"
                                    multiline
                                    rows={4}
                                    sx={{
                                        display: 'block',
                                        margin: '.5rem 0'
                                    }}
                                    name="description"
                                    value={tarea.description}
                                    onChange={handleChange}
                                    inputProps={{ style: { color: "white"} }}
                                    InputLabelProps={{ style: { color: "white"} }}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                    disabled={!tarea.title || !tarea.description}
                                >
                                    {cargando ? (
                                        <CircularProgress color="inherit" size={24} />
                                    ) : ( 
                                        'Guardar'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
  };