import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [values, setValues] = useState({
        name: '',
        budget: ''
    });
    
    const handleChanges = e => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const submit = () => {
        axios
            .post('http://localhost:8000/accounts', values)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        setValues({
            name: '',
            budget: ''
        })
    }


    return (
        <form onSubmit={submit}>
            <input placeholder="name" name="name" value={values.name} onChange={handleChanges} />
            <input placeholder="budget" type="number" name="budget" value={values.budget} onChange={handleChanges} />
            <button>Submit</button>
        </form>
    );
};

export default Form;