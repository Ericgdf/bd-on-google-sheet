import logo from './logo.svg';
import Papa from 'papaparse';
import './App.css';
import { useEffect, useState } from 'react';



function App() {
  const [carsData, setCarsData] = useState([]);

  const prepareJsonData = (parsedData) => {
    const { data } = parsedData;
    const json = data.slice(1).map((line) => {
      let obj = {};
      data[0].forEach((el, j) => {
        obj = { ...obj, [el]: line[j] };
      });
      return obj;
    });
    setCarsData(json);
  };

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTpyu9imt6nd0FR6mFCJFqFKITmrItc1j4sKwJZ4gwZHFryPGPH_7n2wdtQ3oAx5bUZMmlH_ALZZyAs/pub?output=csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          complete: prepareJsonData,
        });
      });
  }, []);

  useEffect(() => {
    console.log(carsData);
  }, [carsData]);

  return (
    <div className="App">
  {carsData.slice(0, 23).map((el, index) => (
    <div className='cars' key={index}>
      {el.company}
      {el.company_city}
    </div>
  ))}
</div>
  );
}

export default App;
