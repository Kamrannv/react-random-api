import React,{Component} from 'react';
import './random-planet.css';
import SwapService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator'

export default class RandomPlanet extends Component{
    swapservice = new SwapService();
    state={
        planet:{},
        loading: true,
        error:false
    }
    coponentDidMount(){
         
        this.updatePlanet();
       this.setInterval = setInterval(this.updatePlanet, 1200);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
  
    onPlanetLoaded = (planet)=>{
        this.setState({planet,loading:false})
    };

    onError =(err)=>{
        this.setState({
            error:true,
            loading:false
        });
    };
    updatePlanet=()=>{
        const id = Math.floor(Math.random()*25) + 3;;    
        this.swapservice
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
    };

    render(){
        const {planet,loading,error} = this.state;
        const hasData = !(loading || error);
        const errorMessage = error?<ErrorIndicator/>:null;
        const spinner = loading ? <Spinner/>:null;
        const content = hasData ?<PlanetView planet={planet}/>:null

        return(
            
            <div className='random-planet jumbotron rounded'>
                {errorMessage}
                {spinner}
                {content}
              
            </div>
        )
    }
}

const PlanetView =({planet})=>{
    const {id, name, population, diameter, rotationPeriod} = planet;
    return(
        <React.Fragment>
        <img className='planet-image'
        src={`http://starwars-visualguide.com/assets/img/planets/${id}.jpg`}alt='planet'/> 
    <h4 className='color'>{name}</h4>
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
        </React.Fragment>
    )
}