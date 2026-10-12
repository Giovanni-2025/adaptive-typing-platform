const BASE = "http://localhost:5000/api";
const EMAIL = "test@example.com";
const PASSWORD = "newpass123"; // change it if you reset the password

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(path, body, cookie) {
  return fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    body: JSON.stringify(body || {}),
  });
}

const buildKeystrokes = (text, intervalMs) =>
  [...text].map((ch, i) => ({ typed_char: ch, t_ms: i * intervalMs }));

async function main() {
  const login = await call("/auth/login", { email: EMAIL, password: PASSWORD });
  if (!login.ok) {
    console.log("Login failed:", login.status, await login.text());
    return;
  }
  const cookie = login.headers.getSetCookie()[0].split(";")[0];

  // 1. Normal session (120 ms per key is about 100 WPM)
  let r = await call("/sessions/start", {}, cookie);
  const { sessionId, text } = await r.json();
  console.log("Text:", text);
  const keys = buildKeystrokes(text, 120);
  const wait = keys[keys.length - 1].t_ms + 500;
  console.log(`Typing for real... waiting ${Math.round(wait / 1000)}s`);
  await sleep(wait);
  r = await call(`/sessions/${sessionId}/submit`, { keystrokes: keys }, cookie);
  console.log("1. Normal submit:", r.status, await r.json());

  // 2. Submit the same session again
  r = await call(`/sessions/${sessionId}/submit`, { keystrokes: keys }, cookie);
  console.log("2. Repeat submit:", r.status, await r.json());

  // 3. Impossible speed (10 ms per key)
  r = await call("/sessions/start", {}, cookie);
  const second = await r.json();
  r = await call(
    `/sessions/${second.sessionId}/submit`,
    { keystrokes: buildKeystrokes(second.text, 10) },
    cookie
  );
  console.log("3. Too fast:", r.status, await r.json());
}

main();