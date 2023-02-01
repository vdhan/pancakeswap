async function main() {
  const PANCAKE_FACTORY = '0x8129D5181EEf6AE30b155E5fd740270C17a21503';
  const WBNB = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

  let PancakeRouter = await ethers.getContractFactory('PancakeRouter');
  let pancakeRouter = await PancakeRouter.deploy(PANCAKE_FACTORY, WBNB);
  let address = pancakeRouter.address;
  console.log(`Pancake Router: ${address}`);

  let PancakeZap = await ethers.getContractFactory('PancakeZap');
  let pancakeZap = await PancakeZap.deploy(WBNB, address, '50');
  console.log(`Pancake Zap: ${pancakeZap.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
