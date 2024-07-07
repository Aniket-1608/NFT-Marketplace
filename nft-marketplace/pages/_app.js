import '../styles/globals.css'
import Link from 'next/link'
require('dotenv').config();
function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <nav className="border-b p-6 bg-gradient-to-r from-blue-800 to-purple-800 shadow-lg">
                <p className="text-4xl font-bold text-white text-center">Metaverse Marketplace</p>
                <div className="flex mt-4 justify-center space-x-6">
                    <Link href="/" passHref legacyBehavior>
                        <a className="text-white hover:text-yellow-300 transition duration-300">Home</a>
                    </Link>
                    <Link href="/dashboard" passHref legacyBehavior>
                        <a className="text-white hover:text-yellow-300 transition duration-300">Dashboard</a>
                    </Link>
                    <Link href="/ownedNFTs" passHref legacyBehavior>
                        <a className="text-white hover:text-yellow-300 transition duration-300">NFTs Owned</a>
                    </Link>
                    <Link href="/createNFT" passHref legacyBehavior>
                        <a className="text-white hover:text-yellow-300 transition duration-300">Mint NFTs</a>
                    </Link>
                </div>
            </nav>
            <main className="flex-grow container mx-auto p-6">
                <Component {...pageProps} />
            </main>
        </div>

    )
}

export default MyApp