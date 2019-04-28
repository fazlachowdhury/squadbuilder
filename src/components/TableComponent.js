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
        console.log('TABLE', this.props.data)
        const tableData = this.props.data;
        return (
        <div style={{margin: 20}}>
        {tableData ? 
         (<Paper square>
           <Table>
               <TableHead>
                   <TableRow>
                       <TableCell className='tableCellHeader' align='center'>Player Name</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Shooting</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Skating</TableCell>
                       <TableCell className='tableCellHeader' align='center'>Checking</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                   <TableCell className='tableCellHeader' align='center'>{tableData.firstName + ' ' + tableData.lastName}</TableCell>
                   <TableCell className='tableCellHeader' align='center'>{tableData.skills[0].rating}</TableCell>
                   <TableCell className='tableCellHeader' align='center'>{tableData.skills[1].rating}</TableCell>
                   <TableCell className='tableCellHeader' align='center'>{tableData.skills[2].rating}</TableCell>
                </TableBody>
           </Table>
           </Paper>) : null
           }
           </div> 
        );
    }
}