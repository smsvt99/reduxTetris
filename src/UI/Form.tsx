import React, { CSSProperties } from 'react';

type formProps = {
    score: number
}

class Form extends React.Component<formProps>{
    state =  {
        name: ""
    }
    commonStyle: CSSProperties = {
        display: 'block',
        backgroundColor: 'transparent',
        color: 'white',
        border: '3px solid white',
        borderRadius: '10px',
        fontFamily: 'johnnyFever',
        margin: 'auto',
        fontSize: '26px',
        maxWidth: '80%'

    } 

    buttonStyle: CSSProperties = {
        ...this.commonStyle,
        cursor: 'pointer',
        marginTop: '26px'
    }

    inputStyle: CSSProperties = {
        ...this.commonStyle,
        textAlign: 'center',
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            name: e.target.value
        })
    }
    submit = (): void => {
        if(this.state.name.length === 3){
            const body = JSON.stringify({name: this.state.name, score: this.props.score});
            fetch('/insertOne', {
                method: "POST",
                redirect: "follow",
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
            .then(res => window.location.href = '/allScores');
        }
    }

    render(){
        return <div>
            <p>enter your name</p>
            <input 
                style = {this.inputStyle}
                type="text" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleChange(e)}
                value={this.state.name}
                maxLength={3}/>
            <button 
                onClick = {this.submit}
                style = {this.buttonStyle}
            >
                submit
            </button>
        </div>
    }
}

export default Form;