import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Dropdown from './components/Dropdown/Dropdown';
import DropdownItem from './components/DropdownItem/DropdownItem';
import SearchButton from './components/SearchButton/SearchButton';

const Home = () => {
  const [years, setYears] = useState([])
  const [yearDropText, setYearDropText] = useState("Year");
  const [chosenYear, setChosenYear] = useState(false);
  const [makes, setMakes] = useState([]);
  const [makeDropText, setMakeDropText] = useState("Make");
  const [chosenMake, setChosenMake] = useState(false);
  const [models, setModels] = useState([]);
  const [modelDropText, setModelDropText] = useState("Model");
  const [chosenModel, setChosenModel] = useState(false);

  // Call the API to get all available years
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8000/years/");
    setYears(response.data.years);
  }
  
  useEffect(() => {
    fetchAPI();
  }, []);
  
  // Sets the year, calls the API to get all makes for that year,
  // and triggers the make select to be available
  const chooseYear = async () => {
    const response = await axios.get(`http://localhost:8000/makes/?year=${yearDropText}`);
    var temp = [];
    setMakes(...temp, response.data.makes);

    // If changing year after making a selection, reset make and model
    if(chosenMake){
      setMakeDropText("Make");
      setChosenMake(false);
    }
    if(chosenModel){
      setModelDropText("Model");
      setChosenModel(false);
    }
    setChosenYear(true);
  }
  
  useEffect(() => {
    if(yearDropText == "Year") return;
    
    chooseYear();
  }, [yearDropText]);
  
  // Sets the make, calls the API to get all models for that year and make,
  // and triggers the model select to be available
  const chooseMake = async () => {
    const response = await axios.get(`http://localhost:8000/models/?year=${yearDropText}&make=${makeDropText}`);
    var temp = [];
    setModels(...temp, response.data.models);

    // If changing make after having chosen a model, reset model
    if(chosenModel){
      setModelDropText("Model");
      setChosenModel(false);
    }
    setChosenMake(true);
  }
  
  useEffect(() => {
    if(makeDropText == "Make") return;
    
    chooseMake();
  }, [makeDropText]);

  // This triggers the Search button to become available once all feilds are filled
  useEffect(() => {
    if(modelDropText == "Model") return;

    setChosenModel(true);
  }, [modelDropText])

  return (
    <>
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
            enabled={true}
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
            enabled={chosenYear}
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
            enabled={chosenMake}
          />
          <SearchButton
            year={yearDropText}
            make={makeDropText}
            model={modelDropText}
            enabled={chosenModel}
          />
        </div>
      </div>
    </>
  )
}

export default Home