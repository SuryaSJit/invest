
const fs = require('fs');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to depl
  const Token = await ethers.getContractFactory("Token");

  const Planner = await ethers.getContractFactory("Planner");

  const token = await Token.deploy();

  await token.deployed()

  const publicKey="0x59F9a3E6340460CBDc5c34BBdC9b76D64C509511";

  token.transfer(publicKey,10000)
  
  const planner = await Planner.deploy(token.address);
  
  await planner.deployed()

  token.transfer(planner.address,1000000)

  const data = {
    address: planner.address,
    abi: JSON.parse(planner.interface.format('json'))
  };
  fs.writeFileSync('ui/src/Token.json', JSON.stringify(data)); 




    console.log("token address:",token.address)
    console.log("deployed to:",planner.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
