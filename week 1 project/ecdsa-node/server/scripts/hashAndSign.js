const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const PRIVATE_KEY /* OF SENDER */ = "a7de947171dbcc9c59d66e57ee79320c573ccaa775a5818ed923ec1c5a32b003";
const FROM_ADDRESS = "0xd07a9f37aa4457b019ca0d31a8ce7c0acf24b8c2";
const TO_ADDRESS = "0x185f97d99923b78d256d8104bda6bed2a55cb57c";
const AMOUNT = 10;

(async () => {
    // Your code goes here
    const message = {
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        amount: AMOUNT
    };

    console.log(message);

    const hashMessage = toHex(keccak256(utf8ToBytes(JSON.stringify(message))));
    console.log("HASHED MESSAGE = ", hashMessage);

    const [signature, recoveryBit] = await secp.sign(hashMessage, PRIVATE_KEY, { recovered: true });
    console.log("SIGNATURE = ", toHex(signature));
    console.log("RECOVERY BIT = ", recoveryBit);
})();