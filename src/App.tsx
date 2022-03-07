import { useEffect, useState } from 'react';

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
        <h2>Countries</h2>
        <select id="dropdownCountry" onChange={onChange}>{countries.map(c => <option value={c.code}>{c.name}</option>)}</select>
        <h2>States</h2>
        <select id="dropdownStates">{states.map(s => <option value={s.code}>{s.name}</option>)}</select>
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
          <select name="parentCountryId">{countries.map(c => <option value={c.id}>{c.name}</option>)}</select>
          <br></br>
          <button type="submit"></button>
        </form>
        
      </header>
    </div>
  );
}

export default App;