const { ethers, upgrades } = require("hardhat");
const { BN } = require("@openzeppelin/test-helpers");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address", deployer.address);

  const Token = await ethers.getContractFactory("VolunteerHour");

  const vhrToken = await upgrades.deployProxy(Token, []);
  await vhrToken.deployed();
  console.log("VolunteerHour Token ", vhrToken.address);
}

main();

// VHR---Own---UUPSProxy: 0x05115022F5cFEff9CDF305324C28196417da953A
// VolunteerHourOwn Token: 0x22623D00a504120f587AC76E3643C8a5e7eBaa59

// VHR---Roles--UUPSProxy: 0x28EE241ab245699968F2980D3D1b1d23120ab8BE
// VolunteerHourRoles Token: 0x777f8dB41882056441CE1023bB3d6ab39f0A007e