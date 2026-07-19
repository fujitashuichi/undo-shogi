import { describe, it, expect, vi, beforeEach } from "vitest";
import { Matcher } from "../Matcher";
import { mockClient } from "../../Clients/__mock__/Client.mock";


describe("Matcher", () => {
  let matcher: Matcher;

  beforeEach(() => {
    matcher = new Matcher();
  });

  it("キューに自分しかいない場合、マッチングが失敗する", () => {
    const client = mockClient();
    matcher.enqueue(client);

    const result = matcher.tryMatch({
      client,
      onMatched: () => "success",
      onFailure: () => "failed",
    });

    expect(result).toBe("failed");
    expect(matcher.clients).toHaveLength(1);
  });


  it("自分以外のプレイヤーがキューにいる場合、マッチングが成功する", () => {
    const me = mockClient();
    const rival = mockClient();

    matcher.enqueue(me);
    matcher.enqueue(rival);

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
