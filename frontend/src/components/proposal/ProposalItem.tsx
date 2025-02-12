import { useSuiClientQuery } from "@mysten/dapp-kit";
import { FC, useState } from "react";
import { EcText } from "../Shared";
import { SuiObjectData } from "@mysten/sui/client";
import { Proposal } from "../../types";
import { VoteModal } from "./VoteModal";

interface ProposalItemsProps {
    id: string;
}

export const ProposalItem: FC<ProposalItemsProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: dataResponse, isPending, error } = useSuiClientQuery(
        "getObject", {
        id: id,
        options: {
            showContent: true
        }
    }
    );

    if (isPending) return <EcText centered text="Loading..." />;
    if (error) return <EcText centered text={`Error: ${error.message}`} isError />;
    if (!dataResponse.data) return <EcText centered text="No data found" isError />;

    const proposal = parseProposal(dataResponse.data);


    if (!proposal) return <EcText centered text="Invalid data" isError />;

    const expiration = proposal.expiration;
    //const expiration = 1;
    const isExpired = isUnixTimeExpired(expiration);


    return (
        <>
            <div
                onClick={() => !isExpired && setIsModalOpen(true)}
                className={`${isExpired? "cursor-not-allowed border-gray-600" : "hover:border-blue-500"} p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors cursor-pointer`}>
                <p
                    className={`${isExpired? "text-gray-600" : "text-gray-300"} text-xl font-semibold mb-2"`}>{proposal.title}
                </p>
                <p
                    className={`${isExpired? "text-gray-600" : "text-gray-300"}`}>{proposal.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4">
                        <div className={`${isExpired? "text-green-800" : "text-green-600"} flex items-center text-green-600`}>
                            <span className="mr-1">👍🏼</span>
                            {proposal.votedYesCount}
                        </div>
                        <div className={`${isExpired? "text-red-800" : "text-red-600"} flex items-center text-red-600`}>
                            <span className="mr-1">👎🏼</span>
                            {proposal.votedNoCount}
                        </div>
                    </div>
                    <div>
                        <p className={`${isExpired? "text-gray-600" : "text-gray-400"} text-sm `}>
                            {`⏱️ ${formatUnixTimestamp(expiration)}`}
                        </p>
                    </div>
                </div>
            </div>
            <VoteModal
                onVote={(votedYes: boolean) => alert(`You voted ${votedYes}`)}
                proposal={proposal}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} />
        </>
    );
}

function parseProposal(data: SuiObjectData): Proposal | null {
    if (data.content?.dataType !== "moveObject") return null;

    const { voted_yes_count, voted_no_count, expiration, ...rest } = data.content.fields as any;

    return {
        ...rest,
        votedYesCount: Number(voted_yes_count),
        votedNoCount: Number(voted_yes_count),
        expiration: Number(expiration)
    }
}

function isUnixTimeExpired(unixTimeDec: number) {
    return new Date(unixTimeDec * 1000) < new Date();
}

function formatUnixTimestamp(timestamp: number): string {
    if (isUnixTimeExpired(timestamp)) return "Expired";

    return new Date(timestamp * 1000).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}