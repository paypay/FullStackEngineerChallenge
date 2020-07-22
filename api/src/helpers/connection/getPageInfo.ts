import { base64Encode } from "../base64";

const getPreviousCursor = (
  cursorIndex: number,
  nodes: number[],
  limit: number
) => {
  // Has previous items
  if (nodes[cursorIndex - 1]) {
    // To get the previous we take current id and go backwards
    // by limit: this will return the first cursor of the previousPage
    // -1 to include that cursor in the results
    const beforeItem = nodes[cursorIndex - limit - 1];
    if (beforeItem) {
      return base64Encode(beforeItem);
    }
    // If there is no previous item it means we reached the end of the array
    // so we add one to include it
    return base64Encode(nodes[0] + 1);
  }
  return null;
};
export const getPageInfo = async (
  nodes: number[],
  afterId: string | undefined,
  limit: number
) => {
  const id = Number(afterId);
  // get the position of the afterId in the global array
  // If there is no afterId supplied, get the position of the first one
  const cursorIndex = id ? nodes.indexOf(id) + 1 : nodes.indexOf(nodes[0]);
  const results = nodes.slice(cursorIndex, limit + cursorIndex);
  const lastItem = results[results.length - 1];

  // Check if the first item from the entire collection is not equal
  // to the last item from pagination
  const hasNextPage = nodes[nodes.length - 1] !== lastItem;
  // Check if there is a value previous to the one searched for
  const previousId = nodes[cursorIndex - 1];
  const hasPreviousPage = !!previousId;

  // The first element will be the previous page starting point
  const previousCursor = getPreviousCursor(cursorIndex, nodes, limit);
  // first id of the sliced array
  const firstCursor = base64Encode(results[0]);
  // The last id in the sliced array is the lastCursor
  const lastCursor = base64Encode(lastItem);

  return {
    hasNextPage,
    hasPreviousPage,
    firstCursor,
    previousCursor,
    lastCursor,
  };
};
