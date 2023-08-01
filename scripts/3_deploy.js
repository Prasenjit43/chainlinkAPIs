const {ethers} = require('ethers');
const fetchFromArrayArtifact = require('../artifacts/contracts/FetchFromArray.sol/FetchFromArray.json');
const {providers} = require('./helper'); 
const {provider,signer} = providers();

//Georli
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const ORACLE = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7";
const JOBID = "7d80a6386ef543a3abb52817f6707e3b";


async function main(){
    const FetchFromArray = new ethers.ContractFactory(fetchFromArrayArtifact.abi, fetchFromArrayArtifact.bytecode, signer);
    const contractInstance = await FetchFromArray.deploy(LINK,ORACLE,JOBID);
    await contractInstance.deployed();
    console.log("Fetch from Array Contract Address : ", contractInstance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode=1;
})
