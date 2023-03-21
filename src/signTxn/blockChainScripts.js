/** @format */

require("dotenv").config();

const fcl = require("@onflow/fcl");
const { authorizationFunction } = require("./authorization");

fcl.config().put("accessNode.api", "https://rest-testnet.onflow.org");

// This function validates the transaction
const validateTransaction = (transactionDetails) => {
  if (transactionDetails.status === 4 && transactionDetails.statusCode === 0) {
    console.log("Successful");
    return "Successful";
  } else {
    return transactionDetails;
  }
};

// const utf8ToHex = (utf8: string) => Buffer.from(utf8, 'utf8').toString('hex')

// This is the function that pays for the transaction and fees

const proposer = authorizationFunction;
const payer = authorizationFunction;
const authorizations = [authorizationFunction];

const mintNFTScript = () => {
  return `
  import NonFungibleToken from 0x631e88ae7f1d7c20
  import Pieces_3 from 0x1ad3c2a8a0bca093
  import MetadataViews from 0x631e88ae7f1d7c20

  transaction(_metadataId: UInt64, _recipient: Address) {

    let Administrator: &Pieces_3.Administrator

    prepare(admin: AuthAccount) {
        // Confirm Admin
        self.Administrator = admin.borrow<&Pieces_3.Administrator>(from: Pieces_3.AdministratorStoragePath)
                          ?? panic("This account is not the Administrator.")
    }

    execute {
        self.Administrator.mintNFT(metadataId: _metadataId, recipient: _recipient)
    }


  }
  `;
};

const mintNFT = async (metadataId, address) => {
  // Args
  const args = (arg, t) => [arg(metadataId, t.UInt64), arg(address, t.Address)];
  return new Promise(async (resolve, reject) => {
    try {
      const transactionId = await fcl.mutate({
        cadence: mintNFTScript(),
        args,
        proposer: authorizationFunction,
        payer: authorizationFunction,
        authorizations: [authorizationFunction],
        limit: 999,
      });
      const transaction = validateTransaction(
        await fcl.tx(transactionId).onceSealed()
      );
      return transaction;
    } catch (e) {
      console.log(e);
      reject(false);
    }
  });
};

module.exports = {
  mintNFT,
};
