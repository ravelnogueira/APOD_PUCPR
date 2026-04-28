(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.APODUtils = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function getTodayIso(now = new Date()) {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDate(date) {
    const parsed = new Date(`${date}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function isFutureDate(date, today = getTodayIso()) {
    return date > today;
  }

  function isValidApodPayload(data) {
    return Boolean(data && data.title && data.date && data.explanation && data.media_type);
  }

  function resolveMediaUrl(data) {
    if (!data || !data.media_type) {
      return "";
    }

    if (data.media_type === "image") {
      return data.hdurl || data.url || "";
    }

    if (data.media_type === "video") {
      return data.url || "";
    }

    return "";
  }

  return {
    formatDate,
    getTodayIso,
    isFutureDate,
    isValidApodPayload,
    resolveMediaUrl
  };
});
