import { useNetworkVariable } from "../config/NetworkConfig";

const PROPOSAL_COUNT = 3;

const ProposalItem = () => {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 hover:border-blue-500 transition-colors">
            <p className="text-xl font-semibold mb-2">Title: Hello There</p>
            <p className="text-gray-700 dark:text-gray-300">Desc: What is your vote?</p>
        </div>
    );
}

const ProposalView = () => {
    const dashboardId = useNetworkVariable("dashboardId");

    console.log(dashboardId);

    return (
        <>
        <h1 className="text-4xl font-semibold mb-8">New Proposals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {new Array(PROPOSAL_COUNT).fill(Math.random()).map((id) => 
            <ProposalItem key={id} />
            )}
        </div>
        </>
    );
}

export default ProposalView;