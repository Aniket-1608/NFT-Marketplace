import { useState } from 'react';
import { ethers, parseUnits } from 'ethers';
import { useRouter } from 'next/router';
import { upload } from 'thirdweb/storage';
import { createThirdwebClient } from 'thirdweb';
import axios from 'axios';
import { marketplaceAddress } from '../config';
import NFTMarketplaceABI from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import Image from 'next/image';


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState('');
    const [ipfsImage, setIpfsImage] = useState('');
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' });
    const [file, setFile] = useState(null);
    // const [message, setMessage] = useState('');
    const router = useRouter();

    const { abi } = NFTMarketplaceABI;
    const client = createThirdwebClient({ clientId: "1bdcd5f74bace6ad67f118cf2d62a7c7" });

    async function uploadImageToIpfs() {
        if (!fileUrl) {
            console.error('No image path available to upload to IPFS.');
            return;
        }
        try {
            console.log("Trying to upload image to IPFS");

            // Fetch the file from the server using the imagePath URL
            const response = await axios.get(fileUrl, {
                responseType: 'blob',
            });

            console.log("Got the image from the server");
            const file = new File([response.data], 'upload', {
                type: response.data.type,
            });
            // const client = createThirdwebClient({ clientId: "1bdcd5f74bace6ad67f118cf2d62a7c7", secretKey: "20o3N5Cq1zEDiF66lpmSomW_rRBXpsA4yYw4vDEuHxz05PjnF6VJCOPeXt7muCVR7MNKZSuW0R-pwj_KIrmBxg" });

            // Upload the file to IPFS
            const uri = await upload({
                client,
                files: [file],
            });

            setIpfsImage(uri);
            // console.log(ipfsImage);
            return uri;
        } catch (error) {
            console.error('Error uploading file to IPFS:', error);
        }
    }

    async function uploadMetadataToIpfs() {
        if (!formInput) {
            console.error('Form input is not defined.');
            return;
        }

        console.log("Fetching IPFS image url");
        const imageurl = await uploadImageToIpfs();
        console.log(imageurl);

        if (!imageurl) {
            console.error('Failed to upload image to IPFS.');
            return;
        }

        const metaData = {
            name: formInput.name,
            price: formInput.price,
            description: formInput.description,
            image: imageurl
        };

        try {
            // const client = createThirdwebClient({ clientId: "1bdcd5f74bace6ad67f118cf2d62a7c7", secretKey: "20o3N5Cq1zEDiF66lpmSomW_rRBXpsA4yYw4vDEuHxz05PjnF6VJCOPeXt7muCVR7MNKZSuW0R-pwj_KIrmBxg" });
            console.log("Uploading metadata to IPFS");
            // Upload the metadata to IPFS
            const tokenUri = await upload({
                client,
                files: [metaData],
            });
            return tokenUri;
        } catch (error) {
            console.error('Error uploading metadata to IPFS:', error);
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        handleFileUpload(selectedFile);
    };

    const handleFileUpload = async (selectedFile) => {
        const formData = new FormData();
        formData.append('uploaded_file', selectedFile);

        try {
            const fileUrl = URL.createObjectURL(selectedFile);
            console.log(fileUrl);
            setFileUrl(fileUrl);
        } catch (error) {
            console.error('File upload failed:', error);
            setFileUrl('');
        }
    };

    async function listNFTForSale() {
        try {

            if (!window.ethereum) {
                throw new Error('Metamask is not installed');
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

            /* next, create the item */

            const ethAmount = formInput.price;
            console.log(ethAmount);
            const contract = new ethers.Contract(marketplaceAddress, abi, signer);

            const listingPrice = await contract.listingPrice();
            const weiAmount = parseUnits(listingPrice.toString(), "wei");
            console.log(weiAmount);

            //upload metadat to ipfs
            const url = await uploadMetadataToIpfs();
            console.log(url);

            const transaction = await contract.createToken(url, ethAmount, {
                value: weiAmount
            });
            console.log("Sent transaction to the network.");
            await transaction.wait();
            console.log("Transaction is success.");

            router.push('/');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full md:w-1/2 flex flex-col pb-8 border border-gray-300 rounded-lg p-8 bg-white shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Mint NFT</h2>
                <input
                    placeholder="Asset Name"
                    className="mt-2 border rounded p-3 focus:outline-none focus:border-purple-500"
                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                />
                <textarea
                    placeholder="Asset Description"
                    className="mt-2 border rounded p-3 h-20 resize-none focus:outline-none focus:border-purple-500"
                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                />
                <input
                    placeholder="Asset Price in Wei"
                    className="mt-2 border rounded p-3 focus:outline-none focus:border-purple-500"
                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                />
                <input
                    type="file"
                    name="Asset"
                    className="my-4"
                    onChange={handleFileChange}
                />
                {
                    fileUrl && (
                        <div className="flex justify-center">
                            <Image className="rounded-lg mt-4 max-w-full" width={300} height={300} style={{ maxHeight: '300px' }} src={fileUrl} alt="Uploaded file" ></Image>
                            {/* <img className="rounded-lg mt-4 max-w-full" style={{ maxHeight: '300px' }} src={fileUrl} alt="Uploaded file" /> */}
                        </div>
                    )
                }
                <button onClick={listNFTForSale} className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none">
                    Mint NFT
                </button>
            </div>
        </div>
    )
}
