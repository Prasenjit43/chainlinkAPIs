const {ethers} = require('ethers');
const multiResponseArtifact = require('../artifacts/contracts/MultiResponse.sol/MultiResponse.json');
const {providers} = require('./helper'); 
const {provider,signer} = providers();

//Georli
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const ORACLE = "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7";
const JOBID = "53f9755920cd451a8fe46f5087468395";


async function main(){
    const MultiResponse = new ethers.ContractFactory(multiResponseArtifact.abi, multiResponseArtifact.bytecode, signer);
    const multiResponseInstance = await MultiResponse.deploy(LINK,ORACLE,JOBID);
    await multiResponseInstance.deployed();
    console.log("Multi Response Contract Address : ", multiResponseInstance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode=1;
})
