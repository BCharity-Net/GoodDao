const { ethers, upgrades } = require("hardhat");
const { BN } = require("@openzeppelin/test-helpers");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address", deployer.address);

  // const RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; --- eth
  // const RouterAddress = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"; --- mumbai
  // const RouterAddress = "0x93bcDc45f7e62f89a8e901DC4A0E2c6C427D9F25"; --- polygon
  const RouterAddress = "0x93bcDc45f7e62f89a8e901DC4A0E2c6C427D9F25";
  const Token = await ethers.getContractFactory("Good");
  const governanceToken = await ethers.getContractFactory(
    "GovernorBravoDelegate"
  );
  const treasuryContract = await ethers.getContractFactory("Treasury");
  const timeLockContract = await ethers.getContractFactory("Timelock");
  const iGiveContract = await ethers.getContractFactory("Igive");

  const goodToken = await upgrades.deployProxy(Token, [
    deployer.address,
    "21000000000000000000000000000",
  ]);
  await goodToken.deployed();
  console.log("Good Token ", goodToken.address);

  const iGiveToken = await upgrades.deployProxy(iGiveContract, [
    goodToken.address,
    deployer.address,
    100,
    21,
  ]);

  await iGiveToken.deployed();

  console.log("iGive Token ", iGiveToken.address);

  const treasury = await upgrades.deployProxy(treasuryContract, [
    goodToken.address,
    RouterAddress,
  ]);
  await treasury.deployed();
  console.log("Treasury Token ", treasury.address);

  const timelock = await upgrades.deployProxy(timeLockContract, [
    deployer.address,
    7200,
  ]);
  await timelock.deployed();
  console.log("Timelock Token ", timelock.address);

  const governance = await upgrades.deployProxy(governanceToken, [
    timelock.address,
    iGiveToken.address,
    32500,
    1,
    "2100000000000000000000",
    treasury.address,
  ]);
  console.log("Governance Token ", governance.address);
}

main();

// Ropsten --- deployed:
// Good Token  0xF3303B8B08da91d6062E771ccC4D64287B148177
// iGive Token  0x5e71D48DBc504d8608FB6F9629c656271D269e3D
// Treasury Token  0x2D1D979977693085c6f62A744c77a728b38d9B1F
// Timelock Token  0x847D119dbDFEE3b5a5a1Bf7880Fba425b37D6648
// Governance Token  0x9C70aF61d757521E9fBeFED2045402FEB044AFbe

// Rinkeby --- deployed:
// Good Token  0x230aA5259C8b388c5e4A6DE2CDE927f2F8A491BE
// iGive Token  0x278D83F14744E1e64939D0D4aD8a51B92B65F561
// Treasury Token  0x504b98A3720cc564874dce0d551EB1d372e7095b
// Timelock Token  0x7efeDA9865d65BFfd6CA3C5232743cb5553c6947
// Governance Token  0xB802d50E31D4A234b1518aC16c3d0335689A5608

// Mumbai --- deployed:
// Deployer address 0x7cE76D95B5BE54D3c1D2b40C1c37C4A8913bD4b5
// Good Token  0x7012C6cA8D08faEcA22ab9931F8A60a7eEa53A47
// iGive Token  0xDA09167F472B5fe816a7eA4F40A0e3C2d0A07Eb2
// Treasury Token  0x2d5980472537C61F03Db4C6D2Ed9de2cC1f43d45
// Timelock Token  0x466ddCEaeE2A7040894ea56615b765739E555b38
// Governance Token  0x1136bF7654F3F4D4026F6c3a13a394823C87A4eF

// Mumbai --- deployed: (new 1/6 treasury.sol)
// Good Token  0xEe4d8767C16f2E4826b414f1D06f40a5dBE6c42e
// iGive Token  0x493e6BDfd1934939366D1BF976F2fb4d2dd39d50
// Treasury Token  0x1Cd1D6E8B55c10a502E69349cB63c6EAa7fed614
// Timelock Token  0x4FB4049013d6AC62744BDc04164BCeF0D643c025
// Governance Token  0xe3c226D6CCe23D926db4038445fF68c04ad1aE8f

// Mumbai --- redeployed on Jul 22 due to pid 1 issue above
// Good Token  0xd21932b453f0dC0918384442D7AaD5B033C4217B
// iGive Token  0xa09508ef545cCe4Ce09bB2b9f585a212E2D690A4
// Treasury Token  0xFE53Fe507452fDDA08c086A08A3eC7fa859D029e
// Timelock Token  0x8387795e7333f6324B15419771E64015C41FEfB0
// Governance Token  0x7cF5441501D186AF1D2ba31fD46608B09D430E08

// Polygon --- deployed on Nov 18, 2023
// Deployer address 0xc660Da06BF954D665a1A65223ff3415AfC4e676B
// Good Token  0x08632C91F3e30515CB417217084554632Cf92161
// iGive Token  0x070F4f3F105De17E04B0466B275bdE6b3dF69Acf
// Treasury Token  0xb96c63cB5B7C76385e0349F2cCafD872843269Db
// Timelock Token  0xB883dd498d5cB78678ABaB8B3131cd8f22E3449a
// Governance Token  0x20C134D496b6c620215666E937d3C2ac5D4ae2D4

