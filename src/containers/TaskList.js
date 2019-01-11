
const converter = require("number-to-words");

export const TaskList = [
  {
    name: "colony contribution",
    type: "awareness",
    description: `The Colony project would like to invite you to help promote its upcoming token distrubtion event. Click <a href="https://colony.io/">here</a> if you are interested!`,
    allocation: 2500,
    tokenName: "colony network token",
    badge: "colony contributor"
  },
  {
    name: "adchain acknowledged",
    type: "action",
    description: `adChain needs your help! The adChain team would like you to help them better regulate its TCR, the adChain Registry. <br/>Based on your talents, you seem like an ideal candidate for the task! Click <a href="/tasks/adchainaction">here</a> to read a more detailed briefing!`,
    allocation: 10000,
    tokenName: "adToken",
    badge: "adchain acknowledged"
  },
  {
    name: "adchain acknowledged",
    type: "action",
    description: `adChain needs your help! The adChain team would like you to help them better regulate its TCR, the adChain Registry. <br/>Based on your talents, you seem like an ideal candidate for the task! Click <a href="/tasks/adchainaction">here</a> to read a more detailed briefing!`,
    allocation: 10000,
    tokenName: "adToken",
    badge: "adchain acknowledged" 
  },
  {
    name: "adchain acknowledged",
    type: "action",
    description: `adChain needs your help! The adChain team would like you to help them better regulate its TCR, the adChain Registry. <br/>Based on your talents, you seem like an ideal candidate for the task! Click <a href="/tasks/adchainaction">here</a> to read a more detailed briefing!`,
    allocation: 10000,
    tokenName: "adToken",
    badge: "adchain acknowledged"
  }
];

export const generateTaskListVars = list => {
  let taskListVars = [];
  for (let i = 0; i < list.length; i++) {
    let num = converter.toWords(i+1);
    let numFormatted = num.charAt(0).toUpperCase() + num.slice(1);
    let rawTaskVar = `isTask${numFormatted}Open`

    taskListVars.push(rawTaskVar);
  }
  return taskListVars;
}
