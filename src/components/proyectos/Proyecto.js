import React, { useContext } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
const Proyecto = ( {proyecto} ) => {
    //Obtener el state del proyecto
    const proyectoContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectoContext;

    const tareaContext = useContext(TareaContext);
    const { obtenerTareas } = tareaContext;



    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id); //Obtengo tareas de un proyecto
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;