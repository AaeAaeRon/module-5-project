import React from 'react';

export default class Client extends React.Component{
    render(){
        return(
            <div>
                {this.props.client.first_name}
            </div>
        )
    }
}