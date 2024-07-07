import * as ethers from 'ethers';
import { useEffect, useState } from 'react'
import { marketplaceAddress } from '../config'
import NFTMarketplaceABI from '../artifacts/contracts/UpgradeableMarketplace.sol/NFTMarketplaceUpgradeable.json'
import useMarketPlace from '../public/indexHelper';
import Image from 'next/image';

export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const { abi } = NFTMarketplaceABI;
    const { fetchMarketItem } = useMarketPlace();

    useEffect(() => {

        const loadNFTs = async () => {
            setLoadingState('loading');
            try {
                const items = await fetchMarketItem();
                // console.log(items[0].description);
                // console.log(items);
                setNfts(items);
                setLoadingState('loaded');
            } catch (error) {
                console.error('Error loading NFTs:', error);
                setLoadingState('error');
            }
        };

        loadNFTs();
    }, [fetchMarketItem]);

    // Function to manually reload NFTs
    const handleReloadNFTs = async () => {
        setLoadingState('loading');
        try {
            const items = await fetchMarketItem();
            setNfts(items);
            setLoadingState('loaded');
        } catch (error) {
            console.error('Error loading NFTs:', error);
            setLoadingState('error');
        }
    };

    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        if (!window.ethereum) {
            throw new Error('Metamask is not Installed');
        }

        const accounts = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log("Please connect to MetaMask.");
                } else {
                    console.error(err);
                }
            });
        const account = accounts[0];

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(marketplaceAddress, abi, signer)

        /* user will be prompted to pay the asking prices to complete the transaction */
        const price = ethers.parseEther(nft.price.toString());
        try {
            console.log('Sending transaction to the blockchain...');
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price
            });
            // console.log("Transaction sent to the blockchain. Waiting for finalising...");
            await transaction.wait();
            console.log("Transaction is success");
        } catch (error) {
            console.error('Error buying NFT:', error);
            setLoadingState('error');
        }

        handleReloadNFTs();
    }

    if (loadingState === 'loaded' && !nfts.length) {
        return (
            <div className="flex justify-center py-10 px-20">
                <h1 className="text-3xl text-gray-800 bg-white rounded-lg p-4 shadow-md">No NFTs Owned</h1>
            </div>
        );
    }

    if (loadingState === 'error') {
        return (
            <div className="flex justify-center py-10 px-20">
                <h1 className="text-3xl text-red-600 bg-white rounded-lg p-4 shadow-md">Error loading NFTs</h1>
            </div>
        );
    }

    return (
        <div className="flex justify-center bg-gray-100 min-h-screen">
            <div className="px-8" >
                <h2 className="text-4xl font-bold text-center text-blue-800 py-6">Unsold Marketplace NFTs</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                    {
                        nfts.map((nft, i) => {
                            let priceInWei = parseFloat(nft.price) * Math.pow(10, 18);
                            return (
                                <div key={i} className="border border-gray-300 shadow-lg rounded-xl overflow-hidden w-full lg:w-97 bg-white">
                                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden relative">
                                        <Image
                                            className="object-cover"
                                            src={nft.image}
                                            alt={nft.name}
                                            fill
                                            priority
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-4 bg-gradient-to-r from-indigo-700 to-indigo-900 text-center text-white">
                                        <p className="text-2xl font-semibold">{nft.name}</p>
                                        <p className="text-gray-300 mt-2">{nft.description}</p>
                                    </div>
                                    <div className="p-4 bg-black flex flex-col items-center">
                                        <p className="text-2xl font-bold text-white">{priceInWei.toFixed(2)} WEI</p>
                                        <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded hover:bg-pink-600 transition duration-300" onClick={() => buyNft(nft)}>
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}