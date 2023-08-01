const {ethers} = require('ethers');
const multiResponseArtifact = require('../artifacts/contracts/MultiResponse.sol/MultiResponse.json');
const linkArtifact = require("../misc/LINK.json");
const {providers} = require('./helper'); 
const {provider,signer} = providers();

const MULTI_RESPONSE_ADDRESS = '0x9b6b4c5394341537b215BE1286BB8F0E6e26F3B1';
const LINK = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const contractInstance = new ethers.Contract(MULTI_RESPONSE_ADDRESS,multiResponseArtifact.abi,provider);
const LinkInstance = new ethers.Contract(LINK, linkArtifact.abi,provider);

async function main() {
    const amountIn = ethers.utils.parseUnits("2", 18);
    console.log("Link before transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link before transfer of Contract: ", (await LinkInstance.balanceOf(MULTI_RESPONSE_ADDRESS)).toString());
    const tx1 = await LinkInstance.connect(signer).transfer(MULTI_RESPONSE_ADDRESS,amountIn);
    await tx1.wait();
    console.log("Link after transfer of Signer: ", (await LinkInstance.balanceOf(signer.address)).toString());
    console.log("Link after transfer of Contract: ", (await LinkInstance.balanceOf(MULTI_RESPONSE_ADDRESS)).toString());
    
    
    const tx2 = await contractInstance.connect(signer).requestMultipleParameters();
    await tx2.wait();
    const multiResFilter = contractInstance.filters.RequestMultipleFulfilled(); 
    const multiResEvents = await contractInstance.queryFilter(multiResFilter);
    const mostRecentEvent = multiResEvents[multiResEvents.length - 1];
    console.log("BTC:", (mostRecentEvent.args.btc).toString());
    console.log("USD:", (mostRecentEvent.args.usd).toString());
    console.log("EUR:", (mostRecentEvent.args.eur).toString());
    await contractInstance.connect(signer).withdrawLink();
    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});