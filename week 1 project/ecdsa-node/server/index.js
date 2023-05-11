const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xd07a9f37aa4457b019ca0d31a8ce7c0acf24b8c2": 100, // Akshat
  "0x185f97d99923b78d256d8104bda6bed2a55cb57c": 50, // Aslam
  "0x75870d7f92d9128937483fd3e0ca1f7511d104ed": 75, // Anurag
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit, publicKey } = req.body;
  console.log("sender = ", sender);
  console.log("recipient = ", recipient);
  console.log("amount = ", amount);
  console.log("signature = ", signature);
  console.log("recoveryBit = ", recoveryBit);
  console.log("publicKey = ", publicKey);

  const message = {
    from: sender,
    to: recipient,
    amount: amount
  };

  const messageHash = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
  const recoveryKey = secp.recoverPublicKey(messageHash, signature, recoveryBit);
  console.log("RECOVERY KEY = ", recoveryKey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (toHex(recoveryKey) === publicKey) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
  else {
    res.status(400).send({ message: "Not the right signature" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
