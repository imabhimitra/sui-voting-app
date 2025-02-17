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
  packageId: "0x50ba7df5fd8203e78b216c7022ca3aeec63cf9ad274fda67b09433f384031838",
  adminCapId: "0xe9186051c3fd20287be992129f0237413ff2811aa1a4c71fc6e90814bf225737",
  dashboardId: "0xc2df73e7a477cef1fd334c98170d7029fbff099019365d04c336597dd2becb3c",
  numProposals: 3, // Specify the number of proposals to generate
};
// Generate the command
const ptbCommand = generatePTBCommand(inputs);
console.log(ptbCommand);