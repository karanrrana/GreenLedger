import React, { useState } from 'react';
import Navbar from './Navbar';
import { useEffect } from 'react'; // removed useState from here
import Web3 from 'web3';
import ABI from "../ABI.json"

function Segregation() {
  const [address, setAddress] = useState("");

  // State variables for form inputs
  const [isSegregationDone, setIsSegregationDone] = useState(false);
  const [totalWaste, setTotalWaste] = useState("");
  const [totalBiomedicalWaste, setTotalBiomedicalWaste] = useState("");
  const [storageProperlyDone, setStorageProperlyDone] = useState(false);
  const [binsNotOverflowing, setBinsNotOverflowing] = useState(false);
  const [wasteStored24Hours, setWasteStored24Hours] = useState(false);
  const [temperatureRecorded, setTemperatureRecorded] = useState("");

  useEffect(() => {
    const getAddress = async () => {
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
      console.log(address);
    }
    getAddress();
  }, [address]);

  const web3 = new Web3(window.ethereum);
  const contractAddress = "0x8d755677cdd61aba0c98463f3ad0e6425024fa12";
  const contract = new web3.eth.Contract(ABI, contractAddress);

  const hospitalWasteRegistration = async () => {
    try {
      console.log(address);
      await contract.methods
        .registerHospitalWaste(isSegregationDone, totalWaste, totalBiomedicalWaste, storageProperlyDone, binsNotOverflowing, wasteStored24Hours, temperatureRecorded  )
        .send({ from: address });
      alert('Hospital Waste registered successfully');
    } catch (error) {
      alert('Hospital Waste registration failed', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row mt-8 mx-4 mr-6 p-6 gap-10-px">
        <div className="flex flex-col gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-xl font-bold text-center my-10">Segregation Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="isSegregationDone">Is Segregation Done?</label>
                    <p className="font-thin">Identification, classification, and segregation, having labelled and dedicated bins (colour-based as per WHO)</p>
                    <select
                      name="isSegregationDone"
                      id="isSegregationDone"
                      className="border rounded-md px-4 py-2 w-full"
                      value={isSegregationDone}
                      onChange={(e) => setIsSegregationDone(e.target.value === "true")}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="totalWaste">Total Waste Generated</label>
                    <p className="font-thin">Quantity of waste generated - General and biomedical</p>
                    <input
                      type="text"
                      name="totalWaste"
                      id="totalWaste"
                      placeholder="kg/tonnes (in whole number)"
                      className="border rounded-md px-4 py-2 w-full"
                      value={totalWaste}
                      onChange={(e) => setTotalWaste(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="totalBiomedicalWaste">Total Biomedical Waste Generated</label>
                  <input
                    type="text"
                    name="totalBiomedicalWaste"
                    id="totalBiomedicalWaste"
                    placeholder="kg/tonnes (in whole number)"
                    className="border rounded-md px-4 py-2 w-full"
                    value={totalBiomedicalWaste}
                    onChange={(e) => setTotalBiomedicalWaste(e.target.value)}
                    required
                  />
                </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-xl font-bold text-center my-10">Storage Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="storageProperlyDone">Storage properly done</label>
                    <p className="font-thin">Storage in labelled and dedicated bins(according to Biomedical Waste Managements Standards)</p>
                    <select
                      name="storageProperlyDone"
                      id="storageProperlyDone"
                      className="border rounded-md px-4 py-2 w-full"
                      value={storageProperlyDone}
                      onChange={(e) => setStorageProperlyDone(e.target.value === "true")}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="binsNotOverflowing">Are bins not overflowing and in properly ventilated areas?</label>
                    <select
                      name="binsNotOverflowing"
                      id="binsNotOverflowing"
                      className="border rounded-md px-4 py-2 w-full"
                      value={binsNotOverflowing}
                      onChange={(e) => setBinsNotOverflowing(e.target.value === "true")}
                      required
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="wasteStored24Hours">Waste stored being 24 hours and is stored within cold storage?</label>
                  <select
                    name="wasteStored24Hours"
                    id="wasteStored24Hours"
                    className="border rounded-md px-4 py-2 w-full"
                    value={wasteStored24Hours}
                    onChange={(e) => setWasteStored24Hours(e.target.value === "true")}
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="temperatureRecorded">Temperature of Room recorded</label>
                  <input
                    type="text"
                    name="temp"
                    id="temp"
                    placeholder="degree C (in whole number)"
                    className="border rounded-md px-4 py-2 w-full"
                    value={temperatureRecorded}
                    onChange={(e) => setTemperatureRecorded(e.target.value)}
                    required
                  />
                </div>
                <button onClick={hospitalWasteRegistration} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Segregation;
