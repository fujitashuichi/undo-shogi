import { describe, it, expect, vi, beforeEach } from "vitest";
import { Client } from "../../../Client";
import { Matcher } from "../../../../Matcher/Matcher";
import { mockClient } from "../__mock__/Client.mock";


describe("Matcher", () => {
  let queue: Set<Client>;
  let matcher: Matcher;

  beforeEach(() => {
    queue = new Set<Client>();
    matcher = new Matcher(queue);
  });


  it("キューに存在しないクライアントがtryMatchを呼んだ場合、キューに追加される", () => {
    const client = mockClient();

    const result = matcher.tryMatch({
      client,
      onMatched: () => "success",
      onFailure: () => "failed",
    });

    expect(result).toBe("failed");
    expect(queue.has(client)).toBe(true);
    expect(queue.size).toBe(1);
  });


  it("キューに自分しかいない場合、マッチングが失敗する", () => {
    const client = mockClient();
    queue.add(client);

    const result = matcher.tryMatch({
      client,
      onMatched: () => "success",
      onFailure: () => "failed",
    });

    expect(result).toBe("failed");
    expect(queue.size).toBe(1);
  });


  it("自分以外のプレイヤーがキューにいる場合、マッチングが成功し、お互いがキューから削除される", () => {
    const me = mockClient();
    const rival = mockClient();

    queue.add(me);
    queue.add(rival);

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

    expect(queue.has(me)).toBe(false);
    expect(queue.has(rival)).toBe(false);
    expect(queue.size).toBe(0);
  });
});
