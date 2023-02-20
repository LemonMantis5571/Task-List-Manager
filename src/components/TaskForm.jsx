import React from 'react';
import { ADD_TASK,  TaskDispatchContext} from './container/TaskContainer';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { LEVELS } from '../models/LEVELS.enum';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




    

const TaskForm = () => {
    const initialValues = { 
        name: '',
        description: '',
        level: LEVELS.normal,
        date: null
    }

    const taskSchema = Yup.object().shape(
        {
            name: Yup.string().min(2, 'Too Short')
                .max(30, 'Too Long')
                .required('Task name is required'),

            description: Yup.string().min(2,'Need a better Description')
                .required('Description required'),
            
            level: Yup.string()
                .oneOf([LEVELS.normal, LEVELS.urgent, LEVELS.blocking], 'You must select a priority')
                .required('Priority is required'),

            date: Yup.date().required('Expiration Date of the task').nullable(),
        }

        
    )

    const {dispatch} = TaskDispatchContext();

    
    const submit = (values) => {
        console.log(values);
        dispatch({
            type: ADD_TASK,
            payload: {
                name: values.name,
                description: values.description,
                priority: values.level,
                date: values.date
            }
        })
    }

    return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={taskSchema}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                await new Promise((r) => setTimeout(r, 1000));
                submit(values);
                resetForm();
            }}>

            {({isSubmitting, values}) => (
                <div className='d-flex justify-content-center align-items-center w-100 form-div'>
                    <Form className='form-parent d-flex flex-column align-items-center justify-content-center align-self'>
                        <div className='mb-3 w-75'>
                            <label htmlFor="name" className='form-label badge fs-5'>Task name</label>
                            <Field id="name" name="name"  type="text" placeholder="TaskNameExample" className='form-control input-lg' />
                                {/* Mensaje de error en taskName */}
                            <ErrorMessage name='name' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3 w-75'>
                            <label htmlFor="description" className='form-label badge fs-5'>Description</label>
                            <Field id="description" name="description"  type="description" placeholder="TaskDescriptionExample" className='form-control'/>
                                    {/* Mensaje de error en description */}
                            <ErrorMessage name='description' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                        </div>

                        <div className='mb-3 w-75'>
                            <label htmlFor="level" className='form-label badge fs-5'>Select Priority</label>
                            <Field component="select" name="level" id="level" className="form-select">
                                    <option value={LEVELS.normal}>Normal</option>
                                    <option value={LEVELS.urgent}>Urgent</option>
                                    <option value={LEVELS.blocking}>Blocking</option>
                            </Field>
                            <ErrorMessage name='level' component='div' className='ErrorMessage bg-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3 datepicker'>
                            <label htmlFor="date" className='form-label badge fs-5'>Select Expiration Date</label>
                            <DatePicker showTimeSelect selected={values.date} name='date' dateFormat="Pp"/>

                            {/* <TextField  type={'datetime-local'} name='date' id='date' 
                            InputProps={{startAdornment: <InputAdornment sx={{backgroundColor: 'white'}}></InputAdornment>}}></TextField> */}
                            {/* <DatePicker name='date' showTimeSelect dateFormat={'Pp'} className='position-relative'></DatePicker> */}
                        </div>
                        <div>
                            <button type="submit" className='btn btn-success'>Create Task</button>
                                {isSubmitting ? (<div className='ErrorMessage bg-success'>Task created sucessfully </div>) : null}
                        </div>
                    </Form>
                </div>)}
                

        </Formik>
                    

            
                {/* <form onSubmit={submit}>
                            <input 
                            type='text'
                            placeholder='Task Name'
                            ref={nameRef}
                            />
                            
                            <input 
                            type='text'
                            placeholder='description'
                            ref={descriptionRef}/>
                            <button type='submit'>Create Task</button>
                        </form> */}
    </div>
    );
}

export default TaskForm;
