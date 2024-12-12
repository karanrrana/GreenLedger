import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Web3 from 'web3';
import ABI from "../ABI.json";

function Disposal() {
  const [address, setAddress] = useState("");
  const [isThermal, setIsThermal] = useState(false);
  const [isChemical, setIsChemical] = useState(false);
  const [isBiological, setIsBiological] = useState(false);
  const [isMechanical, setIsMechanical] = useState(false);
  const [isLandfills, setIsLandfills] = useState(false);
  const [isAshPits, setIsAshPits] = useState(false);
  const [isSewerLines, setIsSewerLines] = useState(false);
  const [isRecycling, setIsRecycling] = useState(false);
  const [isSegregationProper, setIsSegregationProper] = useState(false);
  const [isOtherTreated, setIsOtherTreated] = useState(false);

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

  const disposalWasteRegistration = async () => {
    try {
      console.log(address);
      await contract.methods
        .registerDisposalWaste(
          isThermal,
          isChemical,
          isBiological,
          isMechanical,
          isOtherTreated,
          isLandfills,
          isAshPits,
          isSewerLines,
          isRecycling,
          isSegregationProper
        )
        .send({ from: address });
      alert('Disposal Waste registered successfully');
    } catch (error) {
      alert('Disposal Waste registration failed', error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row mt-8 mx-4 mr-6 p-6 gap-10-px">
        <div className="flex flex-col gap-4">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-xl font-bold text-center my-10">Treatment Information</div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thermal">Thermal-Incinerators and Autoclaves</label>
                <select
                  id="thermal"
                  value={isThermal}
                  onChange={(e) => setIsThermal(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chemical">Chemical-Chemical disinfection</label>
                <select
                  id="chemical"
                  value={isChemical}
                  onChange={(e) => setIsChemical(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biological">Biological-Decomposition and Biodigestion</label>
                <select
                  id="biological"
                  value={isBiological}
                  onChange={(e) => setIsBiological(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mechanical">Mechanical-Shredding Grinding</label>
                <select
                  id="mechanical"
                  value={isMechanical}
                  onChange={(e) => setIsMechanical(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mechanical">Are Other Treatment Methods used</label>
                <select
                  id="Other"
                  value={isOtherTreated}
                  onChange={(e) => setIsOtherTreated(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-xl font-bold text-center my-10">Disposal Information</div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landfills">Landfills</label>
                <select
                  id="landfills"
                  value={isLandfills}
                  onChange={(e) => setIsLandfills(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ashPits">Ash Pits</label>
                <select
                  id="ashPits"
                  value={isAshPits}
                  onChange={(e) => setIsAshPits(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sewerLines">Sewer Lines- Liquid Waste</label>
                <select
                  id="sewerLines"
                  value={isSewerLines}
                  onChange={(e) => setIsSewerLines(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recycling">Recycling</label>
                <select
                  id="recycling"
                  value={isRecycling}
                  onChange={(e) => setIsRecycling(e.target.value === "true")}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <br />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isSegregationProper">Segregation was properly done?</label>
              <select
                id="isSegregationProper"
                value={isSegregationProper}
                onChange={(e) => setIsSegregationProper(e.target.value === "true")}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <button onClick={disposalWasteRegistration} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Disposal;
