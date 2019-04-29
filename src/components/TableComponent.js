import React, {Component} from 'react';
import './table.css';
import _ from 'lodash';
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

    renderTableCells = () => {
        const tempArray = []
        _.each(this.props.data, (data) => {
           tempArray.push(
               <>
               <TableRow id={_.uniqueId()}>
                <TableCell className='tableCellHeader' align='center'>{data.firstName + ' ' + data.lastName}</TableCell>
                <TableCell className='tableCellHeader' align='center'>{data.skills[0].rating}</TableCell>
                <TableCell className='tableCellHeader' align='center'>{data.skills[1].rating}</TableCell>
                <TableCell className='tableCellHeader' align='center'>{data.skills[2].rating}</TableCell>
                </TableRow>
                </>
        )})
        return tempArray
    }

    render() {
        const tableData = this.props.data;
        console.log('Table', tableData)
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
                   {this.renderTableCells()}
                </TableBody>
           </Table>
           </Paper>) : null
           }
           </div>
        );
    }
}
