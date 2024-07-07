import { useEffect, useState } from 'react';
import useMarketPlace from '../public/indexHelper';
import Image from 'next/image';

export default function CreatorDashboard() {
    // const { abi } = NFTMarketplaceABI;
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    const { fetchItemsListed } = useMarketPlace();

    useEffect(() => {

        const loadNFTs = async () => {
            setLoadingState('loading');
            try {
                const items = await fetchItemsListed();
                // console.log(items[0]);
                setNfts(items);
                setLoadingState('loaded');
            } catch (error) {
                console.error('Error loading NFTs:', error);
                setLoadingState('error');
            }
        };

        loadNFTs();
    }, [fetchItemsListed])

    if (loadingState === 'loaded' && !nfts.length) {
        return (
            <div className="flex justify-center py-10 px-20">
                <h1 className="text-3xl text-gray-800 bg-white rounded-lg p-4 shadow-md">No NFTs Listed</h1>
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
            <div className="px-8">
                <h2 className="text-4xl font-bold text-center text-blue-800 py-6">Listed NFTs for Sale</h2>
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
                                    <div className="p-4 bg-gradient-to-r from-purple-700 to-purple-900 text-center text-white">
                                        <p className="text-2xl font-semibold">{nft.name}</p>
                                        <p className="text-gray-300 mt-2 h-12 overflow-hidden">{nft.description}</p>
                                    </div>
                                    <div className="p-4 bg-black text-center text-white">
                                        <p className="text-2xl font-bold">Price - {priceInWei.toFixed(2)} WEI</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}