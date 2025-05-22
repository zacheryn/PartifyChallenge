import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Header from './components/Header/Header';
import Dropdown from './components/Dropdown/Dropdown';
import DropdownItem from './components/DropdownItem/DropdownItem';

function App() {
  const [years, setYears] = useState([])
  const [yearDropText, setYearDropText] = useState("Year");
  const [chosenYear, setChosenYear] = useState(false);
  const [makes, setMakes] = useState([]);
  const [makeDropText, setMakeDropText] = useState("Make");
  const [chosenMake, setChosenMake] = useState(false);
  const [models, setModels] = useState([]);
  const [modelDropText, setModelDropText] = useState("Model");
  const [chosenModel, setChosenModel] = useState(false);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8000/years/");
    setYears(response.data.years);
  }
  
  useEffect(() => {
    fetchAPI();
  }, []);
  
  const chooseYear = async () => {
    const response = await axios.get(`http://localhost:8000/makes/?year=${yearDropText}`);
    var temp = [];
    setMakes(...temp, response.data.makes);
    if(chosenMake){
      setMakeDropText("Make");
      setChosenMake(false);
    }
    if(chosenModel){
      setModelDropText("Model");
      setChosenModel(false);
    }
    setChosenMake(true);
  }
  
  useEffect(() => {
    if(yearDropText == "Year") return;
    
    chooseYear();
  }, [yearDropText]);
  
  const chooseMake = async () => {
    const response = await axios.get(`http://localhost:8000/models/?year=${yearDropText}&make=${makeDropText}`);
    var temp = [];
    setModels(...temp, response.data.models);
    if(chosenModel){
      setModelDropText("Model");
      setChosenModel(false);
    }
    setChosenModel(true);
  }
  
  useEffect(() => {
    if(makeDropText == "Make") return;
    
    chooseMake();
  }, [makeDropText]);

  return (
    <>
      <Header />
      <div className='App'>
        <div className='content'>
          <Dropdown
            buttonText={yearDropText}
            content={
              <>
                {years.map((year) => (
                  <DropdownItem key={year} setButton={setYearDropText}>
                    {year}
                  </DropdownItem>
                ))}
              </>
            }
          />
          <Dropdown
            buttonText={makeDropText}
            content={
              <>
                {makes.map((make) => {
                  return(
                    <DropdownItem key={make} setButton={setMakeDropText}>
                      {make}
                    </DropdownItem>
                  );
                })}
              </>
            }
          />
          <Dropdown
            buttonText={modelDropText}
            content={
              <>
                {models.map((model) => {
                  return(
                    <DropdownItem key={model} setButton={setModelDropText}>
                      {model}
                    </DropdownItem>
                  );
                })}
              </>
            }
          />
        </div>
        <div>
          <div>
            <button type='button'>
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
