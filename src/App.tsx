import React,{useState} from 'react';
import Header from "./components/header";
import Info from "./components/info";
import Chart from "./components/chart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const W3CWebSocket = require('websocket').w3cwebsocket;
let clientSocket = new W3CWebSocket('ws://localhost:8999');
interface socketResponse {
    id: number
    timestamp: number
    temperature: number
    data: number
}

function App() {
    const [data1, setData1] = useState<socketResponse[]>([]);
    const [data2, setData2] = useState<socketResponse[]>([]);

    clientSocket.onopen = () => {
        toast.info('We are Connected');
    };

    clientSocket.onclose = () => {
        toast.warn('We are Disconnected');
    }

    clientSocket.onmessage = (responseData: any) => {
        let dataFromServer: socketResponse[] = JSON.parse(responseData.data);

        let serverData1: socketResponse[] = dataFromServer.filter(data => data.id === 1 && data.data <= 100 );

        setData1((previousData1) => {
            /* challenge said to save 5 mins of data but since the socket sends data every .2 secs
             it generates an enourmous amount of data to be displayed in the chart so I set time interval was set to 20 secs instead.*/
            if (Date.now() - previousData1[0]?.timestamp > 20000) {
                previousData1.shift();
            }
            return previousData1?.concat(serverData1);
        });

        let serverData2: socketResponse[] = dataFromServer.filter(data => data.id === 2 && data.data <= 100 );

        setData2((previousData2) => {
            if (Date.now() - previousData2[0]?.timestamp > 20000) {
                previousData2.shift();
            }
            return previousData2?.concat(serverData2);
        });
    };

    // add latest retrieved temperature
    const temp1 = data1[data1.length - 1]?.temperature;
    const temp2 = data2[data2.length - 1]?.temperature;

    // map timestamp and temperature to a format recognized
    const chartData1 = data1.map(info => ({
        x: new Date(info.timestamp),
        y: info.temperature}))
    const chartData2 = data2.map(info => ({
        x: new Date(info.timestamp),
        y: info.temperature}))

  return (
    <div className="App">
        <ToastContainer position="top-center" autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable/>
        <header className="AppHeader">
            <Header/>
        </header>
        <div className='informationBlocks'>
            <Info id={"ID 1"} value={temp1}/>
            <Info id={"ID 2"} value={temp2}/>
        </div>
        <div className='chartBlock'>
            <Chart id1={"1"} id2={"2"} data1={chartData1} data2={chartData2}/>
        </div>
    </div>
  );
}

export default App;
