import React from 'react'
import Navbar from './Navbar';
import {useState, useEffect} from "react"
import Web3 from 'web3';
import ABI from "../ABI.json"


function Facility() {
    const [shipments, setShipments] = useState([]);
    const [newShipment, setNewShipment] = useState({
      id: '',
      status: '',
      estimatedArrival: ''
    });
    const [address,setAddress] = useState("");



    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewShipment({ ...newShipment, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setShipments([...shipments, newShipment]);
      setNewShipment({ id: '', status: '', estimatedArrival: '' });
    };

    useEffect(()=>{

      const getAddress = async() =>{
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          if (error.message === 'User denied account authorization') {
            // handle the case where the user denied the connection request
          } else if (error.message === 'MetaMask is not enabled') {
            // handle the case where MetaMask is not available
          } else {
            // handle other errors
          }
        }
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        console.log(address)
      }


    getAddress();
    },[address])

    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x8d755677cdd61aba0c98463f3ad0e6425024fa12";
    const contract = new web3.eth.Contract(ABI, contractAddress);

    const facilityRegistration = async() =>{
      try {
        console.log(address)
        await contract.methods
          .registerFacility(newShipment.status, newShipment.estimatedArrival,newShipment.id )
          .send({ from: address });
        alert('Facility registered successfully');
      } catch (error) {
        alert('Error registering Facility', error);
      }
    }

    const [facilityName, setFacilityName] = useState("");
    const[facilityId, setFacilityId] = useState("");
    const [facilityType, setFacilityType] = useState("");


    useEffect(() => {
      const fetchFacilities = async() =>{
        try{
        const facilitie = await contract.methods.getFacility().call({from: address});
        console.log(facilitie)
        setFacilityId(facilitie.facilityId.toString());
        setFacilityName(facilitie.facilityName)
        if(facilitie.facilityType == 0n)
        {
          setFacilityType("Hospital")

        }
        else if(facilitie.facilityType == 1n)
        {
          setFacilityType("Transport")
        }
        else if(facilitie.facilityType == 2n)
        {
          setFacilityType("Treatment")
        }
        else{
          console.log("ERRUR")
        }
          console.log(facilitie)
        }catch(e)
        {
          console.log(e)
        }
      }
      fetchFacilities();
    })

    return (
        <><Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Facility Registration</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">Facility ID</label>
            <input
              type="text"
              name="id"
              id="id"
              placeholder="ID"
              value={newShipment.id}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Facility Name</label>
            <input
              type="text"
              name="status"
              id="status"
              placeholder="Name"
              value={newShipment.status}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedArrival">Type</label>
            <input
              type="text"
              name="estimatedArrival"
              id="estimatedArrival"
              placeholder="(Hospital/Clinic/Lab)/Transportation/Treatment Facility"
              value={newShipment.estimatedArrival}
              onChange={handleChange}
              className="border rounded-md px-4 py-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={facilityRegistration}>Register</button>
        </form>
        <div>
          <h2 className="text-xl font-bold mb-4">Registered Facility(with this address)</h2>
          <ul>
              <li className="mb-2">
                <strong>ID:</strong> {facilityId}, <strong>Name:</strong> {facilityName}, <strong>Type:</strong> {facilityType}
              </li>
          </ul>
        </div>
      </div></>
    );
  }

export default Facility
