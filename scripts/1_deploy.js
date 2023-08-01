const {ethers} = require('ethers');
const singleResponseArtifact = require('../artifacts/contracts/SingleResponse.sol/SingleResponse.json');
const {providers} = require('./helper'); 
const {provider,signer} = providers();

//Georli
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const ORACLE = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7";
const JOBID = "ca98366cc7314957b8c012c72f05aeeb";


async function main(){
    const SingleResponse = new ethers.ContractFactory(singleResponseArtifact.abi, singleResponseArtifact.bytecode, signer);
    const singleResponseInstance = await SingleResponse.deploy(LINK,ORACLE,JOBID);
    await singleResponseInstance.deployed();
    console.log("Single Response Contract Address : ", singleResponseInstance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode=1;
})
