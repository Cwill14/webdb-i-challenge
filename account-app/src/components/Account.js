import React, { useState } from 'react';
import axios from 'axios';

const Account = props => {
    
    const [visible, setVisible] = useState(false);

    const deleteAccount  = id => {
        axios
            .delete(`http://localhost:8000/accounts/${id}`)
            .then(res => {
                console.log("res in acc delete: ", res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="account">
            <h3>{props.account.name}</h3>
            <button onClick={() => setVisible(!visible)}>Show Budget</button>
            {visible ? <h4>{`$${props.account.budget}`}</h4> : null}
            <button onClick={() => deleteAccount(props.account.id)}>Remove Account</button>
        </div>
    );
};

export default Account;