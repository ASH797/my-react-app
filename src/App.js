import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import Card from "./components/Card/Card";
import Pagination from "./components/Pagination/Pagination";
import Filter from "./components/Filter/Filter";
import Navbar from "./components/Navbar/Navbar";

import Episodes from "./Pages/Episodes";
import Location from "./Pages/Location";
import CardDetails from "./components/Card/CardDetails";

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





// export default Home;

export default function App() {
  return (

    <Router>

      <div className="App">

        <Navbar />


      </div>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/episodes" element={<Episodes />} />

        <Route path="/location" element={<Location />} />

        <Route path="/:id" element={<CardDetails />} />
        <Route path="/episodes/:id" element={<CardDetails />} />
        <Route path="/location/:id" element={<CardDetails />} />


      </Routes>


    </Router>
  );
}

const Home = () => {
  // Everything you've written so far in app
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;
  let [pageNumber, updatePageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [status, updateStatus] = useState("");
  let [gender, updateGender] = useState("");
  let [species, updateSpecies] = useState("");

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    })();
  }, [api]);



  return (

    <div className="App">


      <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />

      <div className="container">
        <div className="row">
          <Filter
            pageNumber={pageNumber}
            status={status}
            updateStatus={updateStatus}
            updateGender={updateGender}
            updateSpecies={updateSpecies}
            updatePageNumber={updatePageNumber}

          />
          
          <div className="col-lg-8 col-12">
          
            <div className="row">

            
            <Card page="/" results={results} />
              
              <Pagination
                info={info}
                pageNumber={pageNumber}
                updatePageNumber={updatePageNumber}
              />
               
            </div>

          </div>
        </div>
      </div>



    </div>

  );
};