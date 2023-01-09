const contractName = "dev-1644951219712-66312434539718";

module.exports = function getConfig() {
  let config = {
    networkId: process.env.TEST_REACT_APP_NETWORK_ID,
    nodeUrl: process.env.TEST_REACT_APP_NODE_URL,
    // walletUrl: 'http://localhost:1234',
    walletUrl: `https://wallet.${process.env.TEST_REACT_APP_NETWORK_ID}.near.org`,
    helperUrl: `https://helper.${process.env.TEST_REACT_APP_NETWORK_ID}.near.org`,
    contractName,
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      explorerUrl: process.env.TEST_REACT_APP_NEAR_EXPLORER,
      ...config,
      GAS: "200000000000000",
      DEFAULT_NEW_ACCOUNT_AMOUNT: "5",
      DEFAULT_NEW_CONTRACT_AMOUNT: "5",
      GUESTS_ACCOUNT_SECRET:
        "7UVfzoKZL4WZGF98C3Ue7tmmA6QamHCiB1Wd5pkxVPAc7j6jf3HXz5Y9cR93Y68BfGDtMLQ9Q29Njw5ZtzGhPxv",
      contractMethods: {
        changeMethods: [
          "new",
          "nft_mint",
          "nft_transfer",
          "add_guest",
          "remove_guest",
          "nft_approve_account_id",
          "nft_mint_guest",
          "nft_add_sale_guest",
          "nft_remove_sale_guest",
          "upgrade_guest",
        ],
        viewMethods: ["get_guest", "get_token_ids", "nft_token", "get_sale"],
      },
      marketDeposit: "100000000000000000000000",
      marketId: "market." + contractName,
    };
  }

  if (process.env.REACT_APP_ENV === "prod") {
    config = {
      ...config,
      networkId: process.env.REACT_APP_NETWORK_ID,
      nodeUrl: process.env.REACT_APP_NODE_URL,
      walletUrl: `https://wallet.${process.env.REACT_APP_NETWORK_ID}.near.org`,
      helperUrl: `https://helper.${process.env.REACT_APP_NETWORK_ID}.near.org`,
      contractName: "near",
    };
  }

  return config;
};
