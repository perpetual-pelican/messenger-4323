// function to sort convos by latest message with most recently updated convo first
export default function convoSort(convo1, convo2) {
  if (convo1.messages.length < 1 || convo2.messages.length < 1) return 0;
  const convo1Latest = convo1.messages[convo1.messages.length - 1].createdAt;
  const convo2Latest = convo2.messages[convo2.messages.length - 1].createdAt;
  return convo1Latest <= convo2Latest ? 1 : -1;
}
