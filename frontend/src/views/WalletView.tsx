
import { WalletStatus } from "../components/wallet/Status";

const WalletView = () => {
    return (
        <>
            <div className="mb-8">
            <h1 className="text-4xl font-semibold mb-8">Your Wallet Info</h1>
            <WalletStatus/>
            </div>
        </>
    );
}

export default WalletView;