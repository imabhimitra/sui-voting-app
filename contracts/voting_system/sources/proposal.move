
module voting_system::proposal;

use std::string::String;

// key is ability
public struct Proposal has key {
    id: UID,
    title: String,
    description: String,
    voted_yes_count: u64,
    voted_no_count: u64,
    expiration: u64,
    creator: address,
    voter_registry: vector<address>
}

public fun create(
    title: String,
    description: String,
    expiration: u64,
    ctx: &mut TxContext
) {
    let proposal = Proposal {
       id: object::new(ctx),
       title,
       description,
       voted_yes_count: 0,
       voted_no_count: 0,
       expiration,
       creator: ctx.sender(),
       voter_registry: vector[]
    };

    transfer::share_object(proposal);
}