import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  
  },
 
}));

export default function AvailableBooks() {
  const [rows, setRows] = React.useState([]);
  const [selectedBooks, setSelectedBooks] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:8081/api/book/getBooks')
      .then(response => {
        if (response.data.status === 'success') {
          setRows(response.data.books);
        } else {
          console.error('Failed to fetch books:', response.data.message);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleDelete = (bookid) => {
    axios.delete(`http://localhost:8081/api/book/delete/${bookid}`)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          setRows(prevRows => prevRows.filter(row => row.bookid !== bookid));
          console.log(response.data.message);
        } else {
          console.error('Failed to delete the book:', response.data.message);
        }
      })
      .catch(error => {
        console.error('There was an error deleting the book!', error);
      });
  };

  const handleAdd = (book) => {
    setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, book]);
  };

  const handleNavigate = () => {
    navigate("/myBooks", { state: { selectedBooks } });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Id</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Add </StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.bookid}>
                <StyledTableCell component="th" scope="row">
                  {row.bookid}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.author}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton aria-label="add">
                    <AddIcon onClick={() => handleAdd(row)} />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDelete(row.bookid)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    
      <button onClick={handleNavigate} style={{backgroundColor:"black",fontSize:"16px",marginTop:"20px",marginLeft:"680px",color:"white"}}>View Selected Books</button>
    </>
  );
}
