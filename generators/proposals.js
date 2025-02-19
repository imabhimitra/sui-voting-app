const generatePTBCommand = ({ packageId, adminCapId, dashboardId, numProposals }) => {
  let command = "sui client ptb";
  for (let i = 1; i <= numProposals; i++) {
    // Generate timestamp: current date + 1 year + incremental seconds
    const currentDate = new Date();
    const oneYearFromNow = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    const timestamp = oneYearFromNow.getTime() + i * 1000; // Add 1 second per proposal
    const timestampId = Math.floor(Math.random() * 100000 * i);
    const title = `Proposal ${timestampId}`;
    const description = `Proposal description ${timestampId}`;
    // Add proposal creation command
    command += ` \\
  --move-call ${packageId}::proposal::create \\
  @${adminCapId} \\
  '"${title}"' '"${description}"' ${timestamp} \\
  --assign proposal_id`;
    // Add dashboard registration command
    command += ` \\
  --move-call ${packageId}::dashboard::register_proposal \\
  @${dashboardId} \\
  @${adminCapId} proposal_id`;
  }
  return command;
};
// Inputs
const inputs = {
  packageId: "0x63395fa2af7c49af664b24c601e01bf3a5f8047cd4193a7d3af9dcaa6646282d",
  adminCapId: "0x24c7602a137f481b50a3143bc61a260894e576e710f9bf6abf108df3ee306b4c",
  dashboardId: "0xd1efedb3001d90d3c49ad53bdfdd0b52e75e8b597253e6f7738c24a178404cb5",
  numProposals: 3, // Specify the number of proposals to generate
};
// Generate the command
const ptbCommand = generatePTBCommand(inputs);
console.log(ptbCommand);