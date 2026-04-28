const assert = require("node:assert/strict");
const test = require("node:test");

const {
  formatDate,
  getTodayIso,
  isFutureDate,
  isValidApodPayload,
  resolveMediaUrl
} = require("../apod-utils");

test("getTodayIso returns yyyy-mm-dd format", () => {
  const fixedNow = new Date(2026, 3, 27, 12, 30, 0);
  assert.equal(getTodayIso(fixedNow), "2026-04-27");
});

test("formatDate keeps invalid date unchanged", () => {
  assert.equal(formatDate("invalid-date"), "invalid-date");
});

test("isFutureDate compares using provided today", () => {
  assert.equal(isFutureDate("2026-04-28", "2026-04-27"), true);
  assert.equal(isFutureDate("2026-04-27", "2026-04-27"), false);
  assert.equal(isFutureDate("2026-04-26", "2026-04-27"), false);
});

test("isValidApodPayload returns true only for valid payload", () => {
  const validPayload = {
    date: "2026-04-27",
    explanation: "Descricao",
    media_type: "image",
    title: "Titulo"
  };

  assert.equal(isValidApodPayload(validPayload), true);
  assert.equal(isValidApodPayload({}), false);
  assert.equal(isValidApodPayload(null), false);
});

test("resolveMediaUrl uses hdurl for image and url fallback", () => {
  assert.equal(
    resolveMediaUrl({
      hdurl: "https://example.com/hd.jpg",
      media_type: "image",
      url: "https://example.com/normal.jpg"
    }),
    "https://example.com/hd.jpg"
  );

  assert.equal(
    resolveMediaUrl({
      media_type: "image",
      url: "https://example.com/normal.jpg"
    }),
    "https://example.com/normal.jpg"
  );
});

test("resolveMediaUrl handles video and unsupported media", () => {
  assert.equal(
    resolveMediaUrl({
      media_type: "video",
      url: "https://example.com/video"
    }),
    "https://example.com/video"
  );

  assert.equal(
    resolveMediaUrl({
      media_type: "audio",
      url: "https://example.com/audio"
    }),
    ""
  );
});
