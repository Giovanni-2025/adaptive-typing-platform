// Replays the keystroke log against the real text and computes the scores.
function scoreSession(text, keystrokes) {
  const typedAt = [];
  const entries = [];
  const keyStats = {};
  let pos = 0;
  let typedCount = 0;
  let correctCount = 0;
  let prevT = null;

  const base = Number(keystrokes[0] && keystrokes[0].t_ms);

  for (let i = 0; i < keystrokes.length; i++) {
    const { typed_char, t_ms } = keystrokes[i];

    if (typeof typed_char !== "string" ||
        !(typed_char === "Backspace" || typed_char.length === 1)) {
      return { error: "Invalid key in log" };
    }
    if (typeof t_ms !== "number" || !Number.isFinite(t_ms) || t_ms < 0) {
      return { error: "Invalid timestamp" };
    }
    if (prevT !== null && t_ms < prevT) {
      return { error: "Timestamps out of order" };
    }

    const delta = prevT === null ? null : t_ms - prevT;
    prevT = t_ms;
    const t = t_ms - base;

    if (typed_char === "Backspace") {
      if (pos > 0) {
        pos--;
        typedAt.length = pos;
      }
      // is_correct is not meaningful for Backspace; filter on typed_char instead
      entries.push({ seq: i, expected: null, typed: typed_char, correct: false, t });
      continue;
    }

    if (pos >= text.length) return { error: "Too many keystrokes" };

    const expected = text[pos];
    const correct = typed_char === expected;
    typedAt[pos] = typed_char;
    pos++;
    typedCount++;
    if (correct) correctCount++;

    if (!keyStats[expected]) keyStats[expected] = { attempts: 0, errors: 0, totalMs: 0, timed: 0 };
    keyStats[expected].attempts++;
    if (!correct) keyStats[expected].errors++;
    if (delta !== null) {
      keyStats[expected].totalMs += delta;
      keyStats[expected].timed++;
    }

    entries.push({ seq: i, expected, typed: typed_char, correct, t });
  }

  let finalCorrect = 0;
  for (let p = 0; p < pos; p++) {
    if (typedAt[p] === text[p]) finalCorrect++;
  }

  const durationMs = prevT - base;
  const minutes = durationMs / 60000;

  return {
    entries,
    typedCount,
    correctCount,
    finalCorrect,
    finished: pos >= text.length,
    durationMs,
    accuracy: typedCount > 0 ? (correctCount / typedCount) * 100 : 0,
    grossWpm: minutes > 0 ? typedCount / 5 / minutes : 0,
    netWpm: minutes > 0 ? finalCorrect / 5 / minutes : 0,
    keyStats,
  };
}

module.exports = { scoreSession };