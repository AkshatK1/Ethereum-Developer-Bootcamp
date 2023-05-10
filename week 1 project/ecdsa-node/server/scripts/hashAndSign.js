const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const PRIVATE_KEY = "a7de947171dbcc9c59d66e57ee79320c573ccaa775a5818ed923ec1c5a32b003";
const ADDRESS = "0x185f97d99923b78d256d8104bda6bed2a55cb57c";
const AMOUNT = 10;

const message = {
    sender: PRIVATE_KEY,
    recipient: ADDRESS,
    amount: AMOUNT
};

console.log(message);

const hashMessage = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
console.log("HASHED MESSAGE = ", hashMessage);

const signature = secp.secp256k1.sign(hashMessage, PRIVATE_KEY);
console.log(signature);