import { ConnectButton } from "@mysten/dapp-kit";
import { useNavigation } from "../providers/navigation/NavigationContext";
import { useTheme } from "../providers/theme/ThemeContext";

const Navbar = () => {
    const { toggleDarkMode } = useTheme();

    const { currentPage, navigate } = useNavigation();

    return (
        <nav className="bg-gray-200 dark:bg-gray-800 p-4 shadow-md">
            <div className="flex justify-between max-w-screen-xl m-auto">
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={() => navigate('/')}
                            className={`px-4 py-2 rounded ${currentPage === '/' ? 'bg-green-600' : ""}`}>
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/wallet')}
                            className={`px-4 py-2 rounded ${currentPage === '/wallet' ? 'bg-green-600' : ""}`}>
                            Wallet
                        </button>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    <ConnectButton />
                    <button className="px-1 py-1 rounded" onClick={toggleDarkMode}>
                        {`${useTheme().darkMode ? 'Light' : 'Dark'}`}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;