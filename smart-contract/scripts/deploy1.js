async function main() {
  let [deployer] = await ethers.getSigners();

  let PancakeFactory = await ethers.getContractFactory('PancakeFactory');
  let pancakeFactory = await PancakeFactory.deploy(deployer.address);
  console.log(`Pancake Factory: ${pancakeFactory.address}`);

  let pairHash = await pancakeFactory.INIT_CODE_PAIR_HASH();
  console.log(`Init code pair hash: ${pairHash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
