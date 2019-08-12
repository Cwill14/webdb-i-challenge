import React, { useState } from 'react';

const Account = props => {
    
    // console.log(props);
    // let visible = false;
    const [visible, setVisible] = useState(false);

    return (
        <div  className="account">
            <h3>{props.account.name}</h3>
            <button onClick={() => setVisible(!visible)}>Show Budget</button>
            {visible ? <h4>{`$${props.account.budget}`}</h4> : null}
        </div>
    );
};

export default Account;