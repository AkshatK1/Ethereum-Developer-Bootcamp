import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1"; // const secp = require("ethereum-cryptography/secp256k1");
import { toHex } from "ethereum-cryptography/utils"; // const { toHex } = require("ethereum-cryptography/utils");
import { keccak256 } from "ethereum-cryptography/keccak"; // const { keccak256 } = require("ethereum-cryptography/keccak");

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address = getAddress(publicKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Address: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

function getAddress(publicKey) {
  // get Address similar to Ethereum
  const oneByteOff = publicKey.slice(1);
  const keccak256hash = keccak256(oneByteOff);
  const ethKey = '0x' + toHex(keccak256hash.slice(-20));
  return ethKey;
}

export default Wallet;
