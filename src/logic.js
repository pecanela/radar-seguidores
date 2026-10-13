/* Radar Seguidores - independent implementation. No third-party source code copied. */
(function (scope) {
  "use strict";

  function normalizeUsers(list) {
    const byId = new Map();
    for (const raw of Array.isArray(list) ? list : []) {
      if (!raw || typeof raw !== "object") continue;
      const id = String(raw.id ?? raw.pk_id ?? raw.pk ?? "");
      const username = String(raw.username || "").trim();
      if (!/^\d+$/.test(id) || !/^[A-Za-z0-9._]{1,30}$/.test(username)) continue;
      byId.set(id, {
        id,
        username,
        fullName: String(raw.fullName ?? raw.full_name ?? "").slice(0, 120),
        private: Boolean(raw.private ?? raw.is_private),
        verified: Boolean(raw.verified ?? raw.is_verified)
      });
    }
    return [...byId.values()];
  }

  function compare(current, previous, knownHistory) {
    const following = normalizeUsers(current?.following);
    const followers = normalizeUsers(current?.followers);
    const followedIds = new Set(following.map(u => u.id));
    const followerIds = new Set(followers.map(u => u.id));
    const oldFollowers = normalizeUsers(previous?.followers);
    const history = new Map((Array.isArray(knownHistory) ? knownHistory : [])
      .filter(x => x && /^\d+$/.test(String(x.id)))
      .map(x => [String(x.id), x]));
    const detectionTime = current?.capturedAt || Date.now();
    if (previous) {
      for (const person of oldFollowers) {
        if (!followerIds.has(person.id)) {
          const older = history.get(person.id);
          history.set(person.id, {
            id: person.id,
            username: person.username,
            fullName: person.fullName,
            firstDetectedAt: older?.firstDetectedAt || detectionTime
          });
        }
      }
    }
    const notFollowingBack = following.filter(u => !followerIds.has(u.id));
    const fans = followers.filter(u => !followedIds.has(u.id));
    const lostFollowers = notFollowingBack
      .filter(u => history.has(u.id))
      .map(u => ({...u, firstDetectedAt: history.get(u.id).firstDetectedAt}));
    const byName = (a, b) => a.username.localeCompare(b.username, "pt-BR");
    return {
      notFollowingBack: notFollowingBack.sort(byName),
      fans: fans.sort(byName),
      lostFollowers: lostFollowers.sort((a,b) => b.firstDetectedAt-a.firstDetectedAt || byName(a,b)),
      history: [...history.values()]
    };
  }

  const api = Object.freeze({normalizeUsers,compare});
  scope.RadarLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis === "object" ? globalThis : this);
