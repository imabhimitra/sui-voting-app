import { useCurrentAccount } from "@mysten/dapp-kit";
import { OwnedObjects } from "../OwnedObjects";

export const WalletStatus = () => {
    const account = useCurrentAccount();
    return (
        <div className="my-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <h1 className="mb-2 text-xl font-semibold">Wallet Status</h1>
            {account ? (
                <div className="flex flex-col space-y-1">
                    <p className="text-gray-700 dark:text-gray-300">Wallet Connected</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Address: <span className="font-mono">{account.address}</span>
                    </p>
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300">Not Connected</p>
            )}
            <OwnedObjects/>
        </div>
    );
}