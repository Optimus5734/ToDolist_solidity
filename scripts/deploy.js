
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.parseEther("0.001");

  const toDo = await hre.ethers.deployContract("toDo");

  await toDo.waitForDeployment();

  console.log(
    `toDo with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${toDo.target}`
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error); 
  process.exitCode = 1;
});


//0xD3D6483335C0d327F8BD5b3857A6F24f58522cd7