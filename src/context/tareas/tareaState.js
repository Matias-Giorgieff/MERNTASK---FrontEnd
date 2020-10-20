
import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_ACTUAL,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';
const TareaState = props => {
    const initialState = {
        /* tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 7, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
            {id: 8, nombre: 'Elegir Plataforma', estado: true, proyectoId: 4},
            {id: 9, nombre: 'Elegir Colores', estado: false, proyectoId: 1},
            {id: 10, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 2},
            {id: 11, nombre: 'Elegir Plataforma', estado: true, proyectoId: 3},
            {id: 12, nombre: 'Elegir Colores', estado: false, proyectoId: 4},
            {id: 13, nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: 3},
        ], */
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch ] = useReducer(TareaReducer, initialState);

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: {proyecto}} )
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        console.log(tarea);
        console.log('asdasdasd');
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // ELiminar tarea por ID
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Edita o midifica una tarea
    const actualizarTarea = async tarea => {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

        dispatch({
            type: ACTUALIZAR_ACTUAL,
            payload: resultado.data.tarea
        })
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    // Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    

    //Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA
        })
    }
    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;