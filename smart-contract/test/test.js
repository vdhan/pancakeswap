require('@nomicfoundation/hardhat-chai-matchers');
let {loadFixture} = require('@nomicfoundation/hardhat-network-helpers');
let {expect} = require('chai');

describe('Pancake Swap', function () {
  async function fixture() {
    const MAX_APPROVE = 99999999999999999999n;
    const LIQUIDITY = 100000000000000000n;
    let deadline = Math.ceil(new Date().getTime() / 1000) + 300;
    let [owner] = await ethers.getSigners();

    let WBNB = await ethers.getContractFactory('WBNB');
    let wbnb = await WBNB.deploy();

    let ACS = await ethers.getContractFactory('ACS');
    let acs = await ACS.deploy();

    let CLTK = await ethers.getContractFactory('CLTK');
    let cltk = await CLTK.deploy();

    let PancakeFactory = await ethers.getContractFactory('PancakeFactory');
    let pancakeFactory = await PancakeFactory.deploy(owner.address);

    let PancakeRouter = await ethers.getContractFactory('PancakeRouter');
    let pancakeRouter = await PancakeRouter.deploy(pancakeFactory.address, wbnb.address);

    await acs.approve(pancakeRouter.address, MAX_APPROVE);
    await cltk.approve(pancakeRouter.address, MAX_APPROVE);
    return {owner, acs, cltk, pancakeRouter, deadline, LIQUIDITY};
  }

  it('Add liquidity', async function () {
    let {owner, acs, cltk, pancakeRouter, deadline, LIQUIDITY} = await loadFixture(fixture);
    let balanceA = BigInt(await acs.balanceOf(owner.address));
    let balanceB = BigInt(await cltk.balanceOf(owner.address));
    await pancakeRouter.addLiquidity(
      acs.address,
      cltk.address,
      LIQUIDITY,
      LIQUIDITY,
      '0',
      '0',
      owner.address,
      deadline
    );

    expect(await acs.balanceOf(owner.address)).eq(balanceA - LIQUIDITY);
    expect(await cltk.balanceOf(owner.address)).eq(balanceB - LIQUIDITY);
  });

  it('Swap', async function () {
    let {owner, acs, cltk, pancakeRouter, deadline, LIQUIDITY} = await loadFixture(fixture);
    const SWAP = 10000000000n;
    await pancakeRouter.addLiquidity(
      acs.address,
      cltk.address,
      LIQUIDITY,
      LIQUIDITY,
      '0',
      '0',
      owner.address,
      deadline
    );

    let balanceA = BigInt(await acs.balanceOf(owner.address));
    let balanceB = await cltk.balanceOf(owner.address);
    await pancakeRouter.swapExactTokensForTokens(
      SWAP,
      '1',
      [acs.address, cltk.address],
      owner.address,
      deadline
    );

    expect(await acs.balanceOf(owner.address)).eq(balanceA - SWAP);
    expect(await cltk.balanceOf(owner.address)).gt(balanceB);
  });
});
