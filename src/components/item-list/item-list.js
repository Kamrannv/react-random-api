import React, {Component} from 'react';
import Spinner from '../spinner';
import SwapService from '../../services/swapi-service';
import './item-list.css';

export default class ItemList extends Component{
    swapService = new SwapService()
    state={
        peopleList:null
    }

    componentDidMount(){
        this.swapService
        .getAllPeople()
        .then((peopleList)=>{
            this.setState({
                peopleList
            })
        })
    }
    getItems(arr){
        return arr.map(({id, name})=>{
            return (
                <li className='list-group-item'
                key={id}
                onClick={()=>this.props.onItemSelected(id)}>
                {name}
                 </li>
            )
        })
    }
    render(){
        const {peopleList} = this.state;
        if(!peopleList){
            return <Spinner/>
        }

        const items = this.getItems(peopleList)
        return(
            <ul className='item-list list-group'>
              {items}
            </ul>
        )
    }
}
