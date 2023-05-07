const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);

function getAddress(publicKey) {
    // get Address similar to Ethereum
    const oneByteOff = publicKey.slice(1);
    const keccak256hash = keccak256(oneByteOff);
    const ethKey = '0x' + toHex(keccak256hash.slice(-20));
    return ethKey;
}

console.log(`PRIVATE KEY = ${toHex(privateKey)}
PUBLIC KEY = ${getAddress(publicKey)}`);