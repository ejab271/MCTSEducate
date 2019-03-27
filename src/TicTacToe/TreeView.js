import React, { Component } from 'react'
import '../App.css'
import ColorHash from 'color-hash';

import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';


import * as jquery from 'jquery';
import '../Utils';
import Board from './Board';
import MonteCarloTreeSearch from '../MonteCarlo/MonteCarlo';
import getStats from '../MonteCarlo/MonteCarlo';
import GameLogic from '../GameLogic';



    class TreeView extends React.Component {
      constructor(props) {
        super(props);
        
        // minimal state to manage React lifecycle
        this.state = {
          visible: true,
        };
      }
    
  
      componentDidMount() { 
      }
    
 
      componentWillReceiveProps() {
      }
    
    
      
      componentDidUpdate() {
      }
    
      



    
    }

       
   

    export default TreeView;
