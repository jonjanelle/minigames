import React from 'react';
import './mainComponent.css';
import { MainController } from './Main';

export default class Main extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({game: new MainController("canvas")})
    }

    componentWillUnmount() {}

    render() {
        return (
            <div className="canvas-container"> 
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}
