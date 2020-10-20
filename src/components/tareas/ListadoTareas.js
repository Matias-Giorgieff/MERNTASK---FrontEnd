import React, { Fragment, useContext } from 'react';

import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
const ListadoTareas = () => {
    //Extraer proyecto del state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, eliminarProyecto } = proyectoContext;

    //Obtener las tareas del proyecto
    const tareaContext = useContext(TareaContext);
    const { tareasproyecto } = tareaContext;


    //Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //Array destructuring para extraer el proyecto
    const [proyectoActual] = proyecto;

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                { tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay Tareas</p></li>)

                    :
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}  
                                timeout={200}
                                classNames="tarea"
                            >
                                {<Tarea 
                                    tarea={tarea}
                                />}
                            </CSSTransition>
                        ))}
                    </TransitionGroup> 
                }
            
                <button 
                    type="button"
                    className="btn btn-eliminar"
                    onClick={ ()=>{eliminarProyecto(proyectoActual._id)} }
                >Eliminar Proyecto &times;</button>
            </ul>

            
        </Fragment>
        
     );
}
 
export default ListadoTareas;