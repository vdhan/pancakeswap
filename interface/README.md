# Pancakeswap Frontend
- Rename env to .env and update correspondent data
- Then:
```shell
yarn
```

- Change network chain id in src/connectors/index.ts (if difference from BSC testnet)
- Add coins images to public/images/coins
- Add coins information to src/constants/token/pancakeswap.json
- Update ROUTER_ADDRESS, add new token(s) and their pair to src/constants/index.ts
- Update FACTORY_ADDRESS and INIT_CODE_HASH in:
  + node_modules/@pancakeswap-libs/sdk/dist/constants.d.ts
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.cjs.development.js
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.cjs.development.js.map
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.cjs.production.min.js
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.cjs.production.min.js.map
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.esm.js
  + node_modules/@pancakeswap-libs/sdk/dist/sdk.esm.js.map