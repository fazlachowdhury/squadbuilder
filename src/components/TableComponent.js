import React, {Component} from 'react';
import './table.css';
import 
{
    Table,
    TableRow,
    TableHead,
    TableCell,
    Paper,
    TableBody
} from '@material-ui/core';

export  class TableComponent extends Component {
    render() {
        return (
            <div style={{margin: 20}}>
         <Paper square>
           <Table>
               <TableHead>
                   <TableRow>
                       <TableCell className='tableCellHeader' align='center'>Player Name</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Shooting</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Skating</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Checking</TableCell>
                       </TableRow>
               </TableHead>
               <TableBody>Test</TableBody>
           </Table>
           </Paper>
           </div> 
        );
    }
}