import React from 'react';
import Account from './Account';

const List = props => {
    // console.log(props);
    return (
        <div className="listContainer">
            {props.list.map(account => {
                return <Account account={account} key={account.id} />
            })}
            
        </div>
    );
};

export default List;