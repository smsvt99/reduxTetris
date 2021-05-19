import React, { useEffect } from 'react'; 

type TimeKeeperProps = {
    gameSpeed: number,
    gameStarted: boolean,
    gravityActive: number
}
 
 class TimeKeeper extends React.Component<TimeKeeperProps>{

    state = {
        gameSpeed: 350,
        gameStarted: false,
        gravityActive: 0,
        init: false
    }

    componentDidUpdate(prevProps: TimeKeeperProps) {
        if(this.props.gravityActive != prevProps.gravityActive ||
            this.props.gameStarted != prevProps.gameStarted ||
            this.props.gameSpeed != prevProps.gameSpeed
            ){
                if(!this.props.gameSpeed){
                    alert("game speed undefined")
                }
                this.setState({
                    gameSpeed: this.props.gameSpeed,
                    gameStarted: this.props.gameStarted,
                    gravityActive: this.props.gravityActive
                }, this.init)
            }
      } 

    
    fall = (gameSpeed: number): void => {
        window.setTimeout(this.fall, this.state.gameSpeed)
        let event = new KeyboardEvent('keydown', {key:"ArrowDown"})
        document.dispatchEvent(event);
        this.setState({
            init: true
        })
    }

    init = (): void =>{
        if(this.state.gameStarted && !this.state.gravityActive && !this.state.init){
            this.fall(this.state.gameSpeed)
        } 
    }
    getColor = ():string => {
        const num = 255 - (350 - this.state.gameSpeed);
        return `rgb(255, ${num}, ${num})`;
    }
    getClass = ():string => {
        return this.state.gameSpeed < 100 ? "blinker" : "dummyClass"
    }

   
    render(){
    return <div 
                style={{
                    fontFamily: "johnnyFever",
                    color:this.getColor(),
                    textAlign: "center"
                }}
                className={this.getClass()}
                >Speed: {350 - this.state.gameSpeed} / 275</div>;
    }
    
}

export default TimeKeeper