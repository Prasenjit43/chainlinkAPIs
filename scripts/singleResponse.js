const {ethers} = require('ethers');
const singleResponseArtifact = require('../artifacts/contracts/SingleResponse.sol/SingleResponse.json');
const linkArtifact = require("../misc/LINK.json");
const {providers} = require('./helper'); 
const {provider,signer} = providers();

const SINGLE_RESPONSE_ADDRESS = '0x0d8f91f43d7592f8b9f74fa268f2144df4bcbdf7';
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contractInstance = new ethers.Contract(SINGLE_RESPONSE_ADDRESS,singleResponseArtifact.abi,provider);
const LinkInstance = new ethers.Contract(LINK, linkArtifact.abi,provider);

async function main() {
    const amountIn = ethers.utils.parseUnits("2", 18);
    console.log("Link before transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link before transfer of Contract: ", (await LinkInstance.balanceOf(SINGLE_RESPONSE_ADDRESS)).toString());
    const tx1 = await LinkInstance.connect(signer).transfer(SINGLE_RESPONSE_ADDRESS,amountIn);
    await tx1.wait();
    console.log("Link after transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link after transfer of Contract: ", (await LinkInstance.balanceOf(SINGLE_RESPONSE_ADDRESS)).toString());
    
    const tx2 = await contractInstance.connect(signer).requestVolumeData();
    await tx2.wait();

    const singleResfilter = contractInstance.filters.RequestVolume(); 
    const singleResEvents = await contractInstance.queryFilter(singleResfilter);
    const mostRecentEvent = singleResEvents[singleResEvents.length - 1];
    console.log("24 Hour Volume:", (mostRecentEvent.args.volume).toString());

    await contractInstance.connect(signer).withdrawLink();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});