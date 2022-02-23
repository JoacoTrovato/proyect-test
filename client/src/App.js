import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FormTarea from './components/FormTareas';
import ListaDeTareas from './components/ListaDeTareas';
import Menu from "./components/Navbar";
import { Container } from "@mui/material";

export default function App() {
  return(
    <BrowserRouter>
      <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<ListaDeTareas/>} />
          <Route path="/tareas/nueva" element={<FormTarea/>} />
          <Route path="/tareas/:id/editar" element={<FormTarea/>} />
        </Routes>
      </Container>
    </BrowserRouter> 
     
  )
};
  