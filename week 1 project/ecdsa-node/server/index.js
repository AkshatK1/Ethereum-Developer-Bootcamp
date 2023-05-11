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
  "0x3f27f34227b2edca970392c46d1c09e7ff472db1": 100, // Akshat
  "0x96f89313669b37d4aef2875ef657aa16f8038366": 50, // Aslam
  "0x69a066832b90044432f969411d8eb581070394b4": 75, // Anurag
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

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  const recoveryKey = secp.recoverPublicKey(messageHash, signature, Number(recoveryBit));
  console.log("RECOVERY KEY = ", toHex(recoveryKey));

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
