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

    const onMatched = vi.fn();
    const onFailure = vi.fn();
    matcher.tryMatching({ onMatched, onFailure });

    expect(onMatched).not.toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(matcher.clients).toHaveLength(1);
  });


  it("自分以外のプレイヤーがキューにいる場合、マッチングが成功する", () => {
    const me = mockClient();
    const rival = mockClient();

    matcher.enqueue(me);
    matcher.enqueue(rival);

    const onMatched = vi.fn();
    const onFailure = vi.fn();
    matcher.tryMatching({ onMatched, onFailure });

    expect(onMatched).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
    expect(matcher.clients).toHaveLength(0);
  });
});
