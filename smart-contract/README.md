# Pancakeswap Smart Contract
## For deploying local:
- Change env to .env and update correspondent data  
- Then:
```shell
yarn
yarn compile
yarn start
```

- Open other terminal tab:
```shell
yarn deploy1 localhost
```

- Update correspondent INIT_CODE_PAIR_HASH into contracts/libraries/PancakeLibrary.sol on line 26 (remove prefix "0x")
- Update PANCAKE_FACTORY address in scripts/deploy2.js
- Then:
```shell
yarn deploy2 localhost
yarn test
npx hardhat console --network localhost
```

## For deploying testnet:
```shell
yarn deploy1 testnet
```

- Update correspondent INIT_CODE_PAIR_HASH into contracts/libraries/PancakeLibrary.sol
- Update PANCAKE_FACTORY address in scripts/deploy2.js
- Then:
```shell
yarn deploy2 testnet
yarn verify {PancakeFactory} {feeToSetter}
yarn verify {PancakeRouter} {PancakeFactory} {WBNB}
yarn verify {PancakeZap} {WBNB} {PancakeRouter} 50
npx hardhat console --network testnet
```

## Address
- Pancake Factory: 0x8129D5181EEf6AE30b155E5fd740270C17a21503
- Pancake Router: 0x8602E1a85e0428E4D39C7769Ec71F8B108B22C56
- Pancake Zap: 0x1eB04c439125bc33508296f79Cba007aa73450Dc