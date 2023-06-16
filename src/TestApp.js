import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import signalRServiceInstance from './signalr';

const TestApp = () => {

    const [instruments, setInstruments] = useState('');

    useEffect(() => {
        signalRServiceInstance.registerDataUpdateCallback(onDataUpdate);
    }, []);

    const onDataUpdate = (data) => {
        console.log('Received data:', data);
    };

    const handleInputChange = (event) => {
        setInstruments(event.target.value);
    };

    return (
        <div>
            <label htmlFor="instrumentID">ID</label>
            <input
                type="number"
                name="instrumentID"
                id="instrumentID"
                value={instruments}
                className="scanner-input-field"
                onChange={handleInputChange}
            />
            <button onClick={() => signalRServiceInstance.subscribeInstrument(instruments, 'clientID')}>Add Instrument</button>

            <Link to="/">
            <button className="route-to-landing-page" role="button">
              Return Home
            </button>
          </Link>
        </div>
    );
};

export default TestApp;