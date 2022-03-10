import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import CountriesAndStates from './CountriesAndStates';

interface Country {
  id: number;
  name: string;
  code: string;
}

interface State {
  id: number;
  code: string;
  name: string;
  countryId: number;
}

function sortCountriesAndStatesByName(inputArray:any){
  inputArray.sort(function (a:any, b:any){
      if (a.name > b.name){
          return 1;
      }
      if (b.name > a.name ){
          return -1;
      }
      return 0;
  })
  return inputArray;
}


function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);

  function UpdateCountries(){
    fetch('https://xc-countries-api.herokuapp.com/api/countries/')
          .then((response) => response.json())
          .then((countryData) => {
            countryData = sortCountriesAndStatesByName(countryData);
            setCountries(countryData)
          })
  }
  
  function UpdateStates(inputURL:string){
    fetch(inputURL)
      .then((response) => response.json())
      .then((statesData) => {
        statesData = sortCountriesAndStatesByName(statesData);
        setStates(statesData)
      })
  }

  useEffect(() => UpdateCountries())

  function onChange(event:any) {
    let countryCode = event.target.value;
    let statesURL = 'https://xc-countries-api.herokuapp.com/api/countries/' + countryCode + '/states/';
    UpdateStates(statesURL);
  }

  function addNewState(event:any){
    let statesURL = 'https://xc-countries-api.herokuapp.com/api/states/';
    event.preventDefault();
    console.log("adding new state")
    fetch(statesURL, {
      method: "POST",
  
      body: JSON.stringify(
        {
          code: event.target.stateCode.value,
          name: event.target.stateName.value,
          countryId: event.target.parentCountryId.value
        }
      ),
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((_) => UpdateStates(statesURL))
  }

  function addNewCountry(event:any){
    event.preventDefault();
    console.log("adding new country")
    fetch('https://xc-countries-api.herokuapp.com/api/countries/', {
      method: "POST",
  
      body: JSON.stringify(
        {
          code: event.target.countryCode.value,
          name: event.target.countryName.value
        }
      ),
      headers: {
      "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((_) => UpdateCountries())
}
  
  


  return (
    <div className="App">
      <header className="App-header">
        <CountriesAndStates countriesValues={countries} statesValues={states} countriesTextColumn="name" countriesValuesColumn="code" statesTextColumn="name" statesValuesColumn="code" onChange={onChange}/>
        <form onSubmit={addNewCountry}>
          <h2>New Country</h2>
          <label>Input the new country's name: </label>
          <input type="text" name="countryName"></input>
          <br></br>
          <label>Input the new country's code: </label>
          <input type="text" name="countryCode"></input>
          <br></br>
          <button type="submit">Add New Country</button>
        </form>
        <form onSubmit={addNewState}>
          <h2>New State</h2>
          <label>Input the new state's name: </label>
          <input type="text" name="stateName"></input>
          <br></br>
          <label>Input the new state's code: </label>
          <input type="text" name="stateCode"></input>
          <br></br>
          <label>Select the parent country: </label>
          <Dropdown id="parentCountryId" values={countries} textField="name" valueField="id"/>
          <br></br>
          <button type="submit">Add New State</button>
        </form>
        
      </header>
    </div>
  );
}

export default App;