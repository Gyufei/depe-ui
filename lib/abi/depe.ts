export const DepeAbi = {
  version: "0.1.0",
  name: "depe",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createPool",
      accounts: [
        {
          name: "creator",
          isMut: true,
          isSigner: true,
        },
        {
          name: "seedAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "marginCoin",
          type: "publicKey",
        },
        {
          name: "assetRatingLevel",
          type: {
            defined: "AssetRatingLevel",
          },
        },
        {
          name: "maxLeverage",
          type: "u64",
        },
        {
          name: "dex",
          type: {
            defined: "DEX",
          },
        },
        {
          name: "tradingFee",
          type: "u64",
        },
        {
          name: "durationDays",
          type: "i64",
        },
      ],
    },
    {
      name: "deposit",
      accounts: [
        {
          name: "provider",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userDepeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "sourceTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depeTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdraw",
      accounts: [
        {
          name: "provider",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userDepeTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depeTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "openPosition",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "seedAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "leverage",
          type: "u64",
        },
        {
          name: "debtAmount",
          type: "u64",
        },
        {
          name: "tokenAmountMininum",
          type: "u64",
        },
        {
          name: "commandData",
          type: {
            vec: "bytes",
          },
        },
      ],
    },
    {
      name: "increaseMargin",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "increaseMarginAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "decreaseMargin",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "decreaseMarginAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "increasePosition",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "baseTokenAmount",
          type: "u64",
        },
        {
          name: "qouteTokenAmountMininum",
          type: "u64",
        },
        {
          name: "commandData",
          type: {
            vec: "bytes",
          },
        },
      ],
    },
    {
      name: "decreasePosition",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "qouteTokenAmount",
          type: "u64",
        },
        {
          name: "baseTokenAmountMininum",
          type: "u64",
        },
        {
          name: "commandData",
          type: {
            vec: "bytes",
          },
        },
      ],
    },
    {
      name: "closePosition",
      accounts: [
        {
          name: "trader",
          isMut: true,
          isSigner: true,
        },
        {
          name: "position",
          isMut: true,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolSourceTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolTokenAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "initializeData",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "qouteTokenAmount",
          type: "u64",
        },
        {
          name: "baseTokenAmountMininum",
          type: "u64",
        },
        {
          name: "commandData",
          type: {
            vec: "bytes",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "InitializeData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "poolTokenAuthority",
            type: "publicKey",
          },
          {
            name: "poolTokenAuthorityBumpSeed",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "Pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "creator",
            type: "publicKey",
          },
          {
            name: "marginCoin",
            type: "publicKey",
          },
          {
            name: "assetRatingLevel",
            type: {
              defined: "AssetRatingLevel",
            },
          },
          {
            name: "dex",
            type: {
              defined: "DEX",
            },
          },
          {
            name: "maxLeverage",
            type: "u64",
          },
          {
            name: "tradingFee",
            type: "u64",
          },
          {
            name: "durationDays",
            type: "i64",
          },
          {
            name: "startAt",
            type: "i64",
          },
          {
            name: "depositAmount",
            type: "u64",
          },
          {
            name: "borrowAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Position",
      type: {
        kind: "struct",
        fields: [
          {
            name: "trader",
            type: "publicKey",
          },
          {
            name: "status",
            type: {
              defined: "PositionStatus",
            },
          },
          {
            name: "leverage",
            type: "u64",
          },
          {
            name: "tokenAmount",
            type: "u64",
          },
          {
            name: "debtAmount",
            type: "u64",
          },
          {
            name: "marginAmount",
            type: "u64",
          },
          {
            name: "apr",
            type: "u64",
          },
          {
            name: "remantAsset",
            type: "u64",
          },
          {
            name: "updateTimeStamp",
            type: "i64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "OrcaSwapData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "otherAmountThreshold",
            type: "u64",
          },
          {
            name: "sqrtPriceLimit",
            type: "u128",
          },
          {
            name: "amountSpecifiedIsInput",
            type: "bool",
          },
          {
            name: "aToB",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "AssetRatingLevel",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Low",
          },
          {
            name: "Moderate",
          },
          {
            name: "High",
          },
        ],
      },
    },
    {
      name: "DEX",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Jupiter",
          },
          {
            name: "Raydium",
          },
          {
            name: "Orca",
          },
        ],
      },
    },
    {
      name: "PositionStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Open",
          },
          {
            name: "Liquidate",
          },
          {
            name: "Closed",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidPoolAccount",
      msg: "invaild pool account",
    },
  ],
  metadata: {
    address: "HQo82yKyA4Fixr4g8zZ1jjPgFm5zBc5Uvi2dPwnvWUuy",
  },
};
