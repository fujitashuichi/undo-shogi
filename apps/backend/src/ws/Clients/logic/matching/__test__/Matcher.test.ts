import { describe, it, expect, vi, beforeEach } from "vitest";
import { Client } from "../../../Client";
import { Matcher } from "../../../../Matcher/Matcher";
import { mockClient } from "../__mock__/Client.mock";
import { MatchingQueue } from "../../../../Matcher/MatchingQueue";


describe("Matcher", () => {
  let matchingQueue: MatchingQueue;
  let matcher: Matcher;

  beforeEach(() => {
    matchingQueue = new MatchingQueue();
    matcher = new Matcher(matchingQueue);
  });

  it("キューに自分しかいない場合、マッチングが失敗する", () => {
    const client = mockClient();
    matchingQueue.add(client);

    const result = matcher.tryMatch({
      client,
      onMatched: () => "success",
      onFailure: () => "failed",
    });

    expect(result).toBe("failed");
    expect(matchingQueue.queue).toHaveLength(1);
  });


  it("自分以外のプレイヤーがキューにいる場合、マッチングが成功する", () => {
    const me = mockClient();
    const rival = mockClient();

    matchingQueue.add(me);
    matchingQueue.add(rival);

    const onMatchedMock = vi.fn((_clients) => "matched");
    const onFailureMock = vi.fn(() => "failure");

    const result = matcher.tryMatch({
      client: me,
      onMatched: onMatchedMock,
      onFailure: onFailureMock,
    });


    expect(result).toEqual("matched");

    expect(onMatchedMock).toHaveBeenCalledTimes(1);
    expect(onFailureMock).not.toHaveBeenCalled();
  });
});
