import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import {AiOutlineSearch} from "react-icons/ai";

function App() {
const [searchBook, setSearchBook] = useState('')
const [books, setBooks] = useState(null)

 
function searchGo(event){
const Api ='https://www.googleapis.com/books/v1/volumes?q='+  event

axios.get(Api).then(function(response){
  setBooks(response.data);
  }).catch(function(error){
  console.log(error);
  });
}

console.log(books);

return (
  
  <div className='App'>
    <h1 className='header'>Book Search</h1>

      <div className='search'>
          <input type='text' placeholder="Введите поисковой запрос"
          onChange={e => setSearchBook(e.target.value)} value={searchBook}></input>
          <AiOutlineSearch className="serch-icon" 
          onClick={() => searchGo(searchBook)}></AiOutlineSearch>
      </div>

      <div className='content'>
          {books && books?.totalItems > 0 ? 
          books.items.map((elem) => (<div key={elem.id}>

          <div className='info'>
            <p className='author'>автор: {elem.volumeInfo?.authors && Array.isArray(elem.volumeInfo?.authors) ? 
              elem.volumeInfo?.authors.join(', '): 'Author not found'}</p>
            <p className='title'> "{elem.volumeInfo.title}" </p>
            <p>{elem.volumeInfo.publisher}</p>
            <p>{elem.volumeInfo.publishedDate}</p>

            <div className='image'>
              <img src={elem.volumeInfo.imageLinks?.thumbnail ? 
                elem.volumeInfo.imageLinks.thumbnail : 'https://static.thenounproject.com/png/1527904-200.png'} alt="img"/>
            </div>
    
          </div>
        </div>)) : <p className='notFound'>Books not found</p> }
      </div>
    </div>
  )
}


export default App;
