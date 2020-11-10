
import './App.css';
import Row from './Components/Row'

import AlertDialog from './Components/AlertDialog'

function App() {
  return (
    <div className="App">


    {/* <AlertDialog ></AlertDialog> */}
      
         <Row title="TRENDING" url="https://api.themoviedb.org/3/trending/all/day?api_key={API_KEY}" />
           <Row title="POPULAR" url="https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}" />
  

           
    </div>
  );
}

export default App;
