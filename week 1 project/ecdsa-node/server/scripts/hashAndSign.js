const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const PRIVATE_KEY /* OF SENDER */ = "4edba392eb3253261d8a9164175132f9070b076fd4b3d7c152cbe223f0b73522";
const FROM_ADDRESS = "0x3f27f34227b2edca970392c46d1c09e7ff472db1";
const TO_ADDRESS = "0x96f89313669b37d4aef2875ef657aa16f8038366";
const AMOUNT = 10;

(async () => {
    // Your code goes here
    const message = {
        from: FROM_ADDRESS,
        to: TO_ADDRESS,
        amount: AMOUNT
    };

    console.log(message);

    const hashMessage = keccak256(utf8ToBytes(JSON.stringify(message)));
    console.log("HASHED MESSAGE = ", hashMessage);

    const [signature, recoveryBit] = await secp.sign(hashMessage, PRIVATE_KEY, { recovered: true });
    console.log("SIGNATURE = ", toHex(signature));
    console.log("RECOVERY BIT = ", recoveryBit);
})();