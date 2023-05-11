const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

function getAddress(key) {
    // get Address similar to Ethereum
    const oneByteOff = key.slice(1);
    const keccak256hash = keccak256(oneByteOff);
    const ethKey = '0x' + toHex(keccak256hash.slice(-20));
    return ethKey;
}

console.log(`PRIVATE KEY = ${toHex(privateKey)}
PUBLIC KEY = ${toHex(publicKey)}
ADDRESS = ${getAddress(publicKey)}`);