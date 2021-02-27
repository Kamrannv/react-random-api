import React,{Component} from 'react';
import './random-planet.css';
import SwapService from '../../services/swapi-service'

export default class RandomPlanet extends Component{
    swapservice = new SwapService();
    state={
        planet:null
    }
    constructor(){
        super();
        this.updatePlanet()
    }
    onPlanetLoaded = (planet)=>{
        this.setState({planet})
    }
    updatePlanet(){
        const id=12;
        this.swapservice
        .getPlanet(id)
        .then(this.onPlanetLoaded);
    }
    render(){
        const {planet:{id, name, population, diameter, rotationPeriod}} = this.state;
        return(
            
            <div className='random-planet jumbotron rounded'>
                <img className='planet-image'
                src={`http://starwars-visualguide.com/assets/img/planets/${id}.jpg`}alt='planet'/>
                
            
            <h4>{name}</h4>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                    <span className='term'>Population</span>
                    <span>{population}</span>
                </li>
                <li className='list-group-item'>
                <span className='term'>Rotation Period</span>
                <span>{rotationPeriod}</span>
            </li>
            <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span>{diameter}</span>
        </li>
            </ul>
            </div>
        )
    }
}