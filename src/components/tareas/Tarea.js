import React, { useContext } from 'react';

import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ( {tarea} ) => {

    //Extraer si un proyecto esta activo
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    //Obtener funcion del context de tarea
    const tareaContext = useContext(TareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareaContext;

    //Extraer proyecto actual
    const  [proyectoActual]  = proyecto;
    
    //Funcion que se ejecuta cuando el usuario preciona el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyecto[0].id);
    }

    //Funcion que modifica ele stado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Agrega una tarea actual cuando el usuario quiera editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }
    return ( 

        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    ) 
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>    

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id) }
                >Eliminar</button>
            </div>
        </li>

     );
}
 
export default Tarea;