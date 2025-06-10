import React from "react";
class WelcomeCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title : "State A"
        }
        console.log("Inside Constructor");
    }

    componentWillMount(){
        console.log("Component will mount");
    }

    componentDidMount(){
        console.log("Component did mount");
    }

    shouldComponentUpdate(){
        console.log("Should component update");
        return true;
    }

    componentDidUpdate(){
        console.log("component did update")
    }

    componentWillUnmount(){
        console.log("component will unmount")
    }

    render(){
        console.log("Inside Render")
        const {name} = this.props;
        return <div>
            <h3>Welcome {name}</h3>
            <button onClick={()=>{this.setState({title:"State B"})}}>Change State</button>
        </div>
        
            
    }
}

export default WelcomeCard;