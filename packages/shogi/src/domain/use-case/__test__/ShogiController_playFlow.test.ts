import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ShogiController } from '../ShogiController.js';
import { ShogiError } from '../errors/ShogiError.js';


describe('ShogiController 統合テスト（自然な操作フロー）', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })
  afterEach(() => {
    vi.useRealTimers();
  })


  it('対局開始から、手番交代・タイマー連動までの流れ', () => {
    // 平手、持ち時間: 10分
    const controller = ShogiController.init.hirate({
      remainingSeconds: {
        Sente: 10 * 60,
        Gote: 10 * 60
      }
    });

    controller.start();

    // 3秒経過（先手）
    vi.advanceTimersByTime(3000);
    expect(controller.status.remainingSeconds.Sente).toBe(597);

    // 先手: 7六歩（成らない：false）
    controller.movePiece({ x: 7, y: 6 }, { x: 7, y: 5 }, false);

    // さらに2秒経過
    vi.advanceTimersByTime(2000);
    expect(controller.status.remainingSeconds.Sente).toBe(597);
    expect(controller.status.remainingSeconds.Gote).toBe(598);
  });


  it('駒を指した後に「待った」をした際、盤面とタイマーが完全に巻き戻ること', () => {
    // 平手、持ち時間: 10分
    const controller = ShogiController.init.hirate({
      remainingSeconds: {
        Sente: 10 * 60,
        Gote: 10 * 60
      }
    });

    controller.start();

    // 先手: 2六歩
    controller.movePiece({ x: 7, y: 6 }, { x: 7, y: 5 }, false);

    // 後手: 4秒経過
    vi.advanceTimersByTime(4000);
    expect(controller.status.remainingSeconds.Gote).toBe(596);

    controller.undo();

    // 【検証】盤面が初期状態（履歴が1つ）に戻っているか
    expect(controller.status.history.length).toBe(1);

    // 【検証】手番が先手に戻り、後手のタイマーが巻き戻って止まっているか
    vi.advanceTimersByTime(2000);
    expect(controller.status.remainingSeconds.Gote).toBe(600);
    expect(controller.status.remainingSeconds.Sente).toBe(598);
  });


  it('無効な移動操作が行われた場合、ShogiErrorHandlerを通じて適切に処理されること', () => {
    // 平手、持ち時間: 10分
    const controller = ShogiController.init.hirate({
      remainingSeconds: {
        Sente: 10 * 60,
        Gote: 10 * 60
      }
    });

    controller.start();

    // 不正手エラーを伝播する
    expect(() => {
      controller.movePiece({ x: 7, y: 6 }, { x: 1, y: 1 }, false);
    }).toThrow(ShogiError);
  });

  it("初手はundoできない", () => {
    const controller = ShogiController.init.kakuOchi({
      remainingSeconds: {
        Sente: 10 * 60,
        Gote: 30 * 60
      }
    });

    expect(
      () => controller.undo()
    ).toThrow(
      expect.objectContaining({
        name: "ShogiError",
        errorName: "INVALID_UNDO"
      })
    );
  });
});
