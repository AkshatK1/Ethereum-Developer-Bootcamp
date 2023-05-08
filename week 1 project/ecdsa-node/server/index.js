const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x57ca3d7807553e87dd1c747a71d00bd187c6ffb4": 100, // Akshat - 6a08c3be17c503929b43d86743dc36dbdfe622f64349d4dc8b95dc0924206984
  "0xd4c8eabbf6f7417229752b813c7e77f290bfc1fe": 50, // Aslam - f945c495bf606a2621a88c4724f824b4b0201906760fa947c693d52b776e93ae
  "0x547a0747135a787561a8ba1f2a7e21c36d0bd54c": 75, // Anurag - dbb52df1fee09e5f8f088ed2ef6398034847faae7860a389f06de7383828b2d3
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
