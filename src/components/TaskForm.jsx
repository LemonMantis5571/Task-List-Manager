import React, {useState} from 'react';
import { ADD_TASK,  TaskDispatchContext} from './container/TaskContainer';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { LEVELS } from '../models/LEVELS.enum';
import { TextField } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { CreateTask } from '../services/tasks.service';
import { toast } from 'react-toastify';

const notifyLoading  = (message) => {
    return toast.loading(message);
}

const notifySuccess = (message) => {
    toast.success(message, {
    render: message,
    type: 'success',
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    isLoading: false
    });
}

/* A way to customize the TextField component from Material UI. */
const CssTextField = withStyles(
    {
        root: {
          '& label.Mui-focused': {
            color: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        },
    })(TextField);


const TaskForm = () => {

    const initialValues = { 
        name: '',
        description: '',
        level: LEVELS.normal,
        date: null
    }

    const [date, setDate] = useState(initialValues.date);

    const {dispatch} = TaskDispatchContext();

/* A validation schema for the form. */
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

            date: Yup.string().notRequired('Expiration Date of the task').nullable(),
        }

        
    )


    
/**
 * When the user clicks the submit button, the values from the form are passed to the submit function,
 * which then dispatches an action to the reducer, which then updates the state.
 */
    const submit = async(values) => {

        notifyLoading('Loading...');

        let formatDate =  date ? date.replace('T', ' ') : new Date().toISOString().replace(/\.\d+Z$/, ''); 
        
        try {

            await CreateTask(values.name, values.description, false, values.level, formatDate);
            dispatch({type: ADD_TASK});
            toast.dismiss();
            notifySuccess('Task Created Successfully');

        } catch (error) {
            notifySuccess('Something Went Wrong. Try again later.');
            console.log(error);
        }
    }

    return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={taskSchema}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                await new Promise((r) => setTimeout(r, 500));
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
                            {/* A way to customize the TextField component from Material UI. */}
                            <CssTextField
                                    id="date"
                                    variant='outlined'
                                    name='date'
                                    className='mt-3'
                                    label='Input Date and Hour'
                                    type="datetime-local"
                                    defaultValue={date}
                                    sx={{ width: 250, borderColor: 'white' }}
                                    InputLabelProps={{
                                    shrink: true,}}
                                    onChange={(e) => setDate(e.target.value)}>
                            </CssTextField>

                        </div>
                        <div>
                            <button type="submit" className='btn btn-success button' id='button'>Create Task</button>
                        </div>
                    </Form>
                </div>)}
        </Formik>
    </div>
    );
}

export default TaskForm;
