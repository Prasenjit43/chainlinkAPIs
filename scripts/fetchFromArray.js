const {ethers} = require('ethers');
const fetchFromArrayArtifact = require('../artifacts/contracts/FetchFromArray.sol/FetchFromArray.json');
const linkArtifact = require("../misc/LINK.json");
const {providers} = require('./helper'); 
const {provider,signer} = providers();

const FETCH_FROM_ARRAY_ADDRESS = '0x9788704f8077000926B864D44D1a56f50E9D3A23';
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contractInstance = new ethers.Contract(FETCH_FROM_ARRAY_ADDRESS,fetchFromArrayArtifact.abi,provider);
const LinkInstance = new ethers.Contract(LINK, linkArtifact.abi,provider);

async function main() {
    const amountIn = ethers.utils.parseUnits("2", 18);
    console.log("Link before transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link before transfer of Contract: ", (await LinkInstance.balanceOf(FETCH_FROM_ARRAY_ADDRESS)).toString());
    const tx1 = await LinkInstance.connect(signer).transfer(FETCH_FROM_ARRAY_ADDRESS,amountIn);
    await tx1.wait();
    console.log("Link after transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link after transfer of Contract: ", (await LinkInstance.balanceOf(FETCH_FROM_ARRAY_ADDRESS)).toString());
     
    const tx2 = await contractInstance.connect(signer).requestFirstId();
    await tx2.wait();
    const fetchArrayFilter = contractInstance.filters.RequestFirstId(); 
    const fetchArrayEvents = await contractInstance.queryFilter(fetchArrayFilter);
    const mostRecentEvent = fetchArrayEvents[fetchArrayEvents.length - 1];
    console.log("0th ID:", (mostRecentEvent.args.id).toString());
    await contractInstance.connect(signer).withdrawLink();
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});