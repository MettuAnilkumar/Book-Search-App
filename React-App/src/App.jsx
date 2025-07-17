import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [searchTerm,setSearchTerm] = useState("");
  const [results , setResults] = useState([]);
  const [loading ,setLoading] = useState(false);

  const handleSearch = async () =>{
    if(!searchTerm) return;

    setLoading(true);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`
    );
    const data = await res.json();
    setResults(data.docs.slice(0,10));
    setLoading(false);
  }

  return (
    <>
      <div style={{padding:"20px",fontFamily:"Arial"}}>
        <h1>Book Search App</h1>
        <input
          type='text'
          value={searchTerm}
          placeholder='Enter book title'
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {loading && <p>Loading...</p>}

        <ul>
          {results.map((book,index)=>(
            <li key={index}>
              <strong>{book.title}</strong> by {book.author_name?.join(", ") || "Unknown Author"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
