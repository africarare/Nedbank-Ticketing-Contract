import fs from "fs";
let nft = 0;
const number_of_nfts = 126;
let nftId = 1;

function NFT() {
  nft = {
    name: "NGC Genesis NFT",
    description: "The Nedbank Golf Challenge Genesis NFT has a single purpose use and can be exchanged for 2 physical tickets at the Nedbank Golf Challenge at Sun City.",
    image: `https://bafybeicrosvgdzod5nfoh3j6l4pzmojqc64xgwuv5akmg3vuwr55afqfkm.ipfs.nftstorage.link/Nedbank%20Genesis%20NFT%20-%20${nftId}.png`,
    external_url: "https://africarare.io",
    attributes: [
      { trait_type: "collection", value: "Africarare - Nedbank Metaverse" },
    ],
  };
}

for (let i = 0; i < number_of_nfts; i++) {
  new NFT();
  fs.writeFile(`./out/${nftId}.json`, JSON.stringify(nft, null, 2), (err) => {
    if (err) {
      console.log('Oops, there"s an error');
    } else {
      console.log("File created successfully");
    }
  });
  nftId++;
}
