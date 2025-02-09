import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiObject } from "./SuiObject";

export const OwnedObjects = () => {
    const account = useCurrentAccount();
    const {data: response, isPending, error} = useSuiClientQuery('getOwnedObjects', {
        owner: account?.address as string,
        options: { 
            showType: true,
            showOwner: true,
            showContent: true
         }
    }, {
        enabled: !!account
    });

    if (!account) { return "Cannot retreve account"; }

    if (error) { return <div className="text-red-500"> Error: {error.message}</div>}

    if (isPending || !response) { return <div className="text-center text-gray-500">"Loading..."</div>}

    return (
        <div className="flex flex-col space-y-4 my-4">
            {response.data.length === 0 ? (
                
            <p>No Objects owned in connected wallet</p>) : (
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Owned Objects
                </h2>
            )}
            <div className="space-y-2">
                {response.data.map((objectRes) => (
                    <SuiObject 
                    key={objectRes.data?.objectId} 
                    objectRes={objectRes} />
                ))}

            </div>
        </div>
    );
}