/** @format */

require("dotenv").config();
const mintScript = require("./mintScript");
const axios = require("axios");

const mintNFT = async (twitterId, tweetText, address) => {
  let data = JSON.stringify({
    code: mintScript(),
    arguments: [
      {
        type: "UInt64",
        value: twitterId,
      },
      {
        type: "String",
        value: tweetText,
      },
      {
        type: "Address",
        value: address,
      },
    ],
  });
  const config = {
    method: "post",
    url: "https://piece.herokuapp.com/v1/accounts/0x1ad3c2a8a0bca093/transactions",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const result = await axios(config)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error: any) {
      console.log("Axios Post request error");
      console.log(error);
    });

  return result;
};

// module.exports = {
//   mintNFT,
// };
