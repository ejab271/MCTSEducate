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

class Data extends React.Component {
//     render() {
//       const dataItems = [{
//         "Node": [
//           {
//             "childArray": [{}],
//             "Parent": [{ 
//                 "childArray": [{}],
//                 "Parent": [{}],
//                 "state": [{
//                     "board:": [{}],
//                     "playerNo:": 1,
//                     "visitCount:":100,
//                     "winscore:": 80  
//             }]
//         }],
//             "state": [{
//                 "board:": [{}],
//                 "playerNo:": 1,
//                 "visitCount:":100,
//                 "winscore:": 80  
//             }]
//           }
//         ]
//       }]
// //       return (
// //           <div>
// //               <p> tester </p>
// //          {dataItems.map((item, index) => (
// //     <div key={index}>
// //       <h1>{item.Node}</h1>
// //       {item.map((c, i) => (
// //         <div key={i}>
// //           <h3>{c.childArray}</h3>
// //           <h3>{c.Parent}</h3>
// //           {/* <h3>{c.state.visitCount}</h3> */}
// //           <hr />
// //         </div>
// //       ))}
// //     </div>
// //   ))} 
// //           </div>
// //       )
// let chars = dataItems['Node'];
// for(let i= 0, len= chars.length; i <len; i++){
//     for(let prop in chars[i]){
//         console.log(prop,chars[i][prop])
//     }
// }
//     }
  
// }
}


export default Data;