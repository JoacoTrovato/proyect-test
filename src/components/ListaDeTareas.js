import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function ListaDeTareas() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    const loadTareas = async () => {
        const response = await fetch('http://localhost:3001/tareas');
        const data = await response.json();
        setTareas(data);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/tareas/${id}`, {
            method: "DELETE",
            });
            setTareas(tareas.filter(tarea => tarea.id !== id));
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadTareas();
    }, []);

    
    return(
      <>
        <h1>Lista de Tareas</h1>
        {tareas.map((tarea) => (
            <Card style={{
                marginBottom: ".7rem",
                backgroundColor: "#1e272e"
                }}
                key={tarea.id}
            >
                <CardContent style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <div style={{ color: "white"}}>
                        <Typography>{tarea.title}</Typography>
                        <Typography>{tarea.description}</Typography> 
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => navigate(`/tareas/${tarea.id}/editar`)}
                        >
                            Editar
                        </Button>  
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleDelete(tarea.id)}
                            style={{ marginLeft: ".5rem" }}
                        >
                            Borrar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </>
    );
  };