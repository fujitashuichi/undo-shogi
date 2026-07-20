import type { MatchingQueue } from "./MatchingQueue";
import type { Pair } from "./Matcher";


export const matchingFromQueue = (
  queue: MatchingQueue,
  pairs: Pair[]
): Pair[] => {
  while (queue.size >= 2) {
    const pair = [
      queue.items[0],
      queue.items[1]
    ];

    if (!pair[0] || !pair[1]) break;


    // 必要に応じてここでソート


    pairs.push({
      Sente: pair[0],
      Gote: pair[1]
    });

    queue.remove(pair[0]);
    queue.remove(pair[1]);
  }

  return pairs;
}
