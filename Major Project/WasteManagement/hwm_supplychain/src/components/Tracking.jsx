import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import ABI from "../ABI.json";

function Tracking() {
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({
    id: '',
    No: '', // Changed from vehicleNo
    status: '',
    estimatedArrival: '',
    waste: '' // Added waste field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShipment({ ...newShipment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShipments([...shipments, newShipment]);
    setNewShipment({ id: '', No: '' ,status: '', estimatedArrival: '', waste: '' });
  };

  // getAddress function
  useEffect(() => {
    const getAddress = async () => {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        // Do something with the address
      } catch (error) {
        // Handle errors
      }
    };
    getAddress();
  }, []);

  // transportWasteRegistration function
  const transportWasteRegistration = async () => {
    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x8d755677cdd61aba0c98463f3ad0e6425024fa12";
    const contract = new web3.eth.Contract(ABI, contractAddress);

    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      await contract.methods
        .registerTransportWaste( newShipment.No, newShipment.status, newShipment.estimatedArrival, newShipment.waste)
        .send({ from: address });

      alert('Waste transport registered successfully');
    } catch (error) {
      alert('Error registering waste transport', error);
    }
  };

 const [transportWaste,setTransportWaste] = useState([]);

  useEffect(()=>{
    const fecthtransportWaste = async() =>{
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x1d17b219b0ef6e5cba439ba18b8c23ff5e8248d1";
      const contract = new web3.eth.Contract(ABI, contractAddress);
      try{
        await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const facilitie = await contract.methods.getTransportWaste().call({from: address});
      const facilitieArray = Array.isArray(facilitie) ? facilitie : [facilitie];
      setTransportWaste(facilitieArray);
      console.log(transportWaste)


      }catch(e)
      {
        console.log(e)
      }

    }
    fecthtransportWaste()
  })

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Tracking</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          {/* Input fields */}
          {/* Shipment ID */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">Shipment ID</label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="Shipment ID"
              value={newShipment.id}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          {/* Transport Vehicle Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="No">Transport Vehicle Number</label>
            <input
              type="text"
              name="No"
              id="No"
              placeholder="Transport Vehicle Number"
              value={newShipment.No}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          {/* Status */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              placeholder="Status"
              value={newShipment.status}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          {/* Estimated Arrival */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedArrival">Estimated Arrival</label>
            <input
              type="text"
              name="estimatedArrival"
              id="estimatedArrival"
              placeholder="Estimated Arrival"
              value={newShipment.estimatedArrival}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          {/* Waste Recorded */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waste">Waste Recorded</label>
            <input
              type="text"
              name="waste"
              id="waste"
              placeholder="Waste recorded"
              value={newShipment.waste}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          {/* Submit button */}
          <button type="submit" onClick={transportWasteRegistration} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Shipment</button>
        </form>
        {/* Display current shipments */}
        <div>
          <h2 className="text-xl font-bold mb-4">Current Shipments</h2>
          <ul>
  {transportWaste.map((tw, index) => (
    <li key={index} className="mb-2">
      <strong>Vehicle No:</strong> {tw.vehicleNumber.toString()} <strong>Status:</strong> {tw.status.toString()}, <strong>Estimated Arrival:</strong> {tw.eArrival}, <strong>Status:</strong> {tw.status.toString()},  <strong>Waste Recorded :</strong> {tw.wasteRecorded}
    </li>
  ))}
</ul>
        </div>
      </div>
    </>
  );
}

export default Tracking;
