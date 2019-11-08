import React from 'react';
import './evadeComponent.css';

import { IGameContainer } from '../core/interfaces/IGameContainer';
import { EvadeController } from './Evade';

export default class Evade extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({game: new EvadeController("canvas")})
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
