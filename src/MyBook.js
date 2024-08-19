import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MyBooks() {
  const location = useLocation();
  const selectedBooks = location.state?.selectedBooks || [];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="selected books table">
        <TableHead style={{backgroundColor:"black"}}>
          <TableRow >
            <TableCell style={{color:"white",fontSize:'16px'}}>Book Id</TableCell>
            <TableCell style={{color:"white",fontSize:'16px'}} align="right">Name</TableCell>
            <TableCell style={{color:"white",fontSize:'16px'}}  align="right">Author</TableCell>
            <TableCell style={{color:"white",fontSize:'16px'}}  align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedBooks.map((book) => (
            <TableRow key={book.bookid}>
              <TableCell component="th" scope="row">
                {book.bookid}
              </TableCell>
              <TableCell align="right">{book.name}</TableCell>
              <TableCell align="right">{book.author}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
