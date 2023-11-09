import { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./contractJson/toDo.json";
import Footer from "./components/Footer";
import Memos from "./components/Memos";
import Buy from "./components/buy";
import Header from "./components/Header";

function App() {
  const [state, setState] = useState({
    provider: null,
    singular: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet= async () => {
      const contractAddress = "0xB73eA8c4d8F0224c6b792442d009723Cb15C31d0";
      const contractABI = abi.abi;
      //MetaMask
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          //to reload the window when account is changed
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          console.log(account)
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  const urlOfLink = `https://goerli.etherscan.io/address/${account[0]}`;
  return (
    <div className="App">
      <Header />
      <div>
        <h5 className="account">
          Connected Account:<br></br>
          {account[0]}
        </h5>
      </div>
      <a href={urlOfLink}>VisitWebsite</a>
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
      <Footer />
    </div>
  );
}

export default App;
