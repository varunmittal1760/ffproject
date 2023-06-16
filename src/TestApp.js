import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import signalRServiceInstance from './signalr';

const TestApp = () => {
  const [instrumentID, setInstrumentID] = useState('');
  const [data, setData] = useState(null);
  const [instrumentDataDict, setInstrumentDataDict] = useState({});

  useEffect(() => {
    signalRServiceInstance.registerDataUpdateCallback(onDataUpdate);
    return () => {
      signalRServiceInstance.deregisterDataUpdateCallback();
    };
  }, []);

  const onDataUpdate = (data) => {
    const parsedData = JSON.parse(data);
    const latestInstrumentID = parsedData.instrumentID;
    const latestData = parsedData.data;

    setData(latestData);

    setInstrumentDataDict((prevDict) => ({
      ...prevDict,
      [latestInstrumentID]: latestData,
    }));
  };

  const handleInputChange = (event) => {
    setInstrumentID(event.target.value);
  };

  const addInstrument = () => {
    signalRServiceInstance.subscribeInstrument(instrumentID, 'clientID');
  };

  return (
    <div>
      <label htmlFor="instrumentID">ID</label>
      <input
        type="number"
        name="instrumentID"
        id="instrumentID"
        value={instrumentID}
        className="scanner-input-field"
        onChange={handleInputChange}
      />
      <button onClick={addInstrument}>Add Instrument</button>

     

      <Link to="/">
        <button className="route-to-landing-page" role="button">
          Return Home
        </button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instrument ID</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(instrumentDataDict).map(([id, value]) => (
            <tr key={id}>
              <td>Row</td>
              <td>{id}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestApp;