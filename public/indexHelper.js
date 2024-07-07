import { ethers } from "ethers";
import axios from "axios";
import { marketplaceAddress } from "../config";
import NFTMarketplaceABI from "../artifacts/contracts/UpgradeableMarketplace.sol/NFTMarketplaceUpgradeable.json";
import { download } from "thirdweb/storage";
import { createThirdwebClient } from "thirdweb";
import { useCallback } from "react";

export default function useMarketPlace() {
    const { abi } = NFTMarketplaceABI;
    // const [nftData, setNftData] = useState({ name: '', image: '', description: '' });
    const client = createThirdwebClient({ clientId: process.env.NEXT_PUBLIC_CLIENT_ID });
    const fetchMarketItem = useCallback(async () => {
        try {
            if (!window.ethereum) {
                throw new Error('Ethereum provider not found');
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(marketplaceAddress, abi, provider);
            const data = await contract.fetchMarketItem();
            // console.log(data);


            if (!data.length) {
                return [];
            }

            let items = [];
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]); // Print each element to inspect its structure
                const tokenId = data[i][0];
                // console.log(data[i][3]);
                let price = ethers.formatEther(data[i][1]);
                // console.log(price);

                //fetch the token uri
                const tokenUri = await contract.tokenURI(tokenId);
                // console.log("Fetching token uri from smart contract");

                let meta, nftName, nftImage, nftDescription;
                if (!tokenUri.startsWith('ipfs')) {
                    meta = { image: "", name: "", description: "" };
                }
                else {
                    meta = await download({
                        client: client,
                        uri: tokenUri
                    });

                    try {
                        const fileUrl = meta.url;
                        // Fetch the JSON data
                        const response = await axios.get(fileUrl);
                        const data = response.data;

                        //now first fetch the clean url of the image from the third web
                        const imageData = await download({
                            client: client,
                            uri: data.image
                        });
                        console
                        const imageUrl = imageData.url;
                        nftName = data.name;
                        nftImage = imageUrl;
                        nftDescription = data.description;
                        // console.log(nftName, nftImage, nftDescription);

                    } catch (error) {
                        console.error('Error loading file', error);
                        throw new Error('Error loading file');
                    }
                }


                let item = {
                    price,
                    tokenId: tokenId,
                    seller: data[i][1].toString(),
                    owner: data[i][2].toString(),
                    sold: data[i][4],
                    image: nftImage,
                    name: nftName,
                    description: nftDescription
                }
                items.push(item);
            }

            return items;
        } catch (error) {
            console.error('Error loading market items:', error);
            throw new Error('Error loading market items');
        }
    }, [abi]);

    const fetchItemsListed = useCallback(async () => {
        try {
            if (!window.ethereum) {
                throw new Error('Ethereum provider not found');
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(marketplaceAddress, abi, signer);
            const data = await contract.fetchItemsListed();
            // console.log(data);
            if (!data.length) {
                return [];
            }

            let items = [];

            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]); // Print each element to inspect its structure
                const tokenId = data[i][0];
                let price = ethers.formatEther(data[i][1]);

                const tokenUri = await contract.tokenURI(tokenId);
                // console.log("Fetching token uri from smart contract");

                let meta, nftName, nftImage, nftDescription;
                if (!tokenUri.startsWith('ipfs')) {
                    meta = { image: "", name: "", description: "" };
                }
                else {
                    meta = await download({
                        client: client,
                        uri: tokenUri
                    });

                    try {
                        const fileUrl = meta.url;
                        // Fetch the JSON data
                        const response = await axios.get(fileUrl);
                        const data = response.data;

                        //now first fetch the clean url of the image from the third web
                        const imageData = await download({
                            client: client,
                            uri: data.image
                        });

                        const imageUrl = imageData.url;
                        nftName = data.name;
                        nftImage = imageUrl;
                        nftDescription = data.description;
                        // console.log(nftName, nftImage, nftDescription);

                    } catch (error) {
                        console.error('Error loading file', error);
                        throw new Error('Error loading file');
                    }
                }
                // console.log("Loaded nft details from toke uri");
                let item = {
                    price,
                    tokenId: tokenId,
                    seller: data[i][1].toString(),
                    owner: data[i][2].toString(),
                    sold: data[i][4],
                    image: nftImage,
                    name: nftName,
                    description: nftDescription
                }
                items.push(item);
                // console.log("pushed the nft to items array object");
            }
            // console.log("Items array object ready!");
            return items;
        } catch (error) {
            console.error('Error loading listed items:', error);
            throw new Error('Error loading listed items');
        }
    }, [abi]);

    const fetchMyNfts = useCallback(async () => {
        try {
            if (!window.ethereum) {
                throw new Error('Ethereum provider not found');
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(marketplaceAddress, abi, signer);
            const data = await contract.fetchMyNfts();
            // console.log(data);
            if (!data.length) {
                return [];
            }

            let items = [];

            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]); // Print each element to inspect its structure
                const tokenId = data[i][0];
                let price = ethers.formatEther((data[i][1]));

                const tokenUri = await contract.tokenURI(tokenId);
                // console.log("Fetching token uri from smart contract");

                let meta, nftName, nftImage, nftDescription;
                if (!tokenUri.startsWith('ipfs')) {
                    meta = { image: "", name: "", description: "" };
                }
                else {
                    meta = await download({
                        client: client,
                        uri: tokenUri
                    });

                    try {
                        const fileUrl = meta.url;
                        // Fetch the JSON data
                        const response = await axios.get(fileUrl);
                        const data = response.data;

                        //now first fetch the clean url of the image from the third web
                        const imageData = await download({
                            client: client,
                            uri: data.image
                        });

                        const imageUrl = imageData.url;
                        nftName = data.name;
                        nftImage = imageUrl;
                        nftDescription = data.description;
                        // console.log(nftName, nftImage, nftDescription);

                    } catch (error) {
                        console.error('Error loading file', error);
                        throw new Error('Error loading file');
                    }
                }

                let item = {
                    price,
                    tokenId: tokenId,
                    seller: data[i][1].toString(),
                    owner: data[i][2].toString(),
                    sold: data[i][4],
                    name: nftName,
                    image: nftImage,
                    description: nftDescription,
                }
                items.push(item);
            }

            return items;
        } catch (error) {
            console.error('Error loading my NFTs:', error);
            throw new Error('Error loading my NFTs');
        }
    }, [abi]);

    return { fetchMarketItem, fetchItemsListed, fetchMyNfts };
}