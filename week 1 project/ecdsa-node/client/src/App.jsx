import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [publicKey, setPublicKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address}
        signatureR={signature}
        recoveryBit={recoveryBit}
        publicKey={publicKey}
        setSignature={setSignature}
        setRecoveryBit={setRecoveryBit}
        setPublicKey={setPublicKey} />
    </div>
  );
}

export default App;
