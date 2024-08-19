import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
export default function NewBook() {
  const navigate=useNavigate();
  const [bookDetails, setBookDetails] = useState({
    bookid:'',
    name: '',
    author: '',
    price: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBookDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/book/saveBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookDetails)
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Book saved:', data);
        navigate('/availableBooks')
      } else {
        console.error('Failed to save book:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card sx={{ width: 550, marginLeft: 50, marginTop: 14, height: 400, backgroundColor: "pink" }}>
      <CardContent>
        <Typography sx={{ fontSize: 25, marginLeft: 20 }} color="text.secondary" gutterBottom>
          <b> Add New Book </b>
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            id="bookid"
            label="Book Id"
            variant="outlined"
            value={bookDetails.bookid}
            onChange={handleChange}
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={bookDetails.name}
            onChange={handleChange}
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <TextField
            id="author"
            label="Author"
            variant="outlined"
            value={bookDetails.author}
            onChange={handleChange}
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            value={bookDetails.price}
            onChange={handleChange}
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <Button type="submit" variant="contained" color="primary"   style={{ marginTop: '20px', marginLeft: '20px' }}>
            Save Book
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
