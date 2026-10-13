<p align="center"><img src="docs/images/banner.png" alt="Radar Seguidores — Instagram followers analysis dashboard" width="100%"></p>

<h1 align="center">Radar Seguidores</h1>
<p align="center"><strong>Find who doesn't follow you back. Track lost followers. Review your following list.</strong></p>
<p align="center">A free, open-source browser extension that analyzes your Instagram followers directly in your browser.</p>

<p align="center">
  <a href="https://github.com/pecanela/radar-seguidores/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/pecanela/radar-seguidores/actions/workflows/ci.yml/badge.svg?branch=main"></a>
  <a href="https://github.com/pecanela/radar-seguidores/releases"><img alt="Beta" src="https://img.shields.io/badge/release-v1.1.0--beta.1-2363eb"></a>
  <a href="LICENSE"><img alt="MIT" src="https://img.shields.io/badge/license-MIT-16a34a"></a>
  <a href="#compatibility"><img alt="Firefox + Chromium" src="https://img.shields.io/badge/browsers-Firefox%20%7C%20Chromium-64748b"></a>
</p>
<p align="center">
  <a href="https://github.com/pecanela/radar-seguidores/releases"><b>⬇️ Downloads</b></a> ·
  <a href="#installation"><b>🚀 Installation</b></a> ·
  <a href="#screenshots"><b>🖼️ Screenshots</b></a> ·
  <a href="#frequently-asked-questions"><b>❓ FAQ</b></a>
</p>
<p align="center"><a href="README.md">🇧🇷 Português</a> · 🇺🇸 <b>English</b></p>

> [!IMPORTANT]
> **Desktop beta.** An earlier version was tested on desktop Firefox, but this updated release and the Chromium builds still require real-account validation. GitHub Release downloads are test packages, not store-signed extensions. There is no Android APK available.

---

## Why Radar Seguidores?

When you follow hundreds or thousands of accounts, it can be difficult to see who doesn't follow you back or which accounts stopped following you since the last check. Radar Seguidores groups those relationships into three searchable lists.

| Not following back | Unfollowed you | Followers you don't follow |
|:---|:---|:---|
| You **follow them**, but they don't follow you. | They **followed you previously**, no longer do, and you still follow them. | They **follow you**, but you don't follow them. |
| Available after your first scan. | Requires two complete scans on different occasions. | Available after your first scan. |

**Also includes:** username/name search, profile links, individually confirmed **Unfollow** actions, per-account local scan history and a delete-history option.

## Screenshots

<p align="center">
  <a href="docs/images/nao-me-seguem.png"><img src="docs/images/nao-me-seguem.png" alt="Not following back screen" width="88%"></a>
  <br><sub>Accounts you follow that don't follow you back.</sub>
</p>

<table>
  <tr>
    <td width="50%" align="center"><a href="docs/images/pararam-de-seguir.png"><img src="docs/images/pararam-de-seguir.png" alt="Previously followed you screen"></a><br><sub><b>Unfollowed you</b> — historical comparison</sub></td>
    <td width="50%" align="center"><a href="docs/images/me-seguem-nao-sigo.png"><img src="docs/images/me-seguem-nao-sigo.png" alt="Followers you don't follow screen"></a><br><sub><b>Followers you don't follow</b> — one-way relationships</sub></td>
  </tr>
</table>

<sub>Actual extension interface running with synthetic demonstration accounts. No real Instagram accounts were exposed.</sub>

## Installation

### 1. Download the appropriate browser package

Go to **[Releases](https://github.com/pecanela/radar-seguidores/releases)** and find `v1.1.0-beta.1`:

| Browser | File |
|---|---|
| 🦊 Firefox (desktop) | `Radar-Seguidores-Firefox-v1.1.0-beta.1.zip` |
| 🌐 Chrome, Edge, Brave (desktop) | `Radar-Seguidores-Chromium-v1.1.0-beta.1.zip` |

**Extract the ZIP.** The extracted folder should contain `manifest.json`, `main.js` and `logic.js` at its root.

### 2A. Firefox — Windows, macOS or Linux

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **Load Temporary Add-on**.
3. Select the **`manifest.json`** file in the extracted folder.
4. Visit **[instagram.com](https://www.instagram.com/)**, sign in and refresh the page.
5. Click **◎ Radar Seguidores** in the bottom-right corner and select **Analisar agora** (Scan now).

> [!NOTE]
> In regular Firefox, this installation is **temporary** and is removed on restart. Permanent installation requires Mozilla signing and is not yet available for this release.

### 2B. Chrome, Edge or Brave — desktop

1. Open `chrome://extensions`, `edge://extensions` or `brave://extensions`.
2. Turn on **Developer mode**.
3. Select **Load unpacked**.
4. Choose the **extracted folder** containing `manifest.json`.
5. Open **[Instagram](https://www.instagram.com/)**, refresh the page and launch **◎ Radar Seguidores**.

Keep the extracted folder in place while using the extension. Users of the prepared packages do not need to install Python, Node.js or additional development software.

### 3. Your first scan

1. Sign in to Instagram normally in the browser running the extension.
2. Click **Analisar agora** and wait until the followers and following lists have fully loaded.
3. Browse **Não me seguem**, **Pararam de seguir**, or **Me seguem, não sigo**.
4. For individual unfollows, click **Deixar de seguir** and **confirm** each action.
5. Scan again on a later date to identify accounts that stopped following you **since the previous scan**.

> [!WARNING]
> Your first scan **cannot recover people who unfollowed before you started tracking**. Instagram may throttle data requests, particularly for large accounts. Respect the application's suggested scan interval and avoid repeated bulk activity.

## Compatibility

| Platform | Status |
|---|---|
| Firefox desktop | Earlier prototype tested with a real account; updated beta build needs retesting. |
| Chrome / Edge / Brave desktop | Built and available for testing; live validation pending. |
| Firefox Android | Under consideration; compatible signed extension and mobile testing needed. |
| Chrome / Brave Android | Cannot conventionally install these desktop extension packages. |
| Android APK | Not available; the earlier prototype was not validated for distribution. |

## Privacy first

- **No separate password screen:** uses your existing session on `instagram.com`.
- **No project-run data collection server:** scans and history are stored locally, separately for each account.
- **No ads or trackers added by this project.**
- **Scoped permissions:** `instagram.com` access and extension-local storage only.
- **Individual control:** every unfollow requires confirmation; no mass-unfollow feature.

> [!CAUTION]
> Radar Seguidores uses **unofficial internal Instagram interfaces**. They may change, fail or trigger account rate limits/restrictions. This project is not affiliated with, sponsored or endorsed by Meta or Instagram. Open source does not mean risk-free or officially approved.

[Privacy policy (Portuguese)](docs/PRIVACIDADE.md) · [Security (Portuguese)](docs/SEGURANCA.md) · [Release checklist (Portuguese)](docs/PUBLICACAO.md)

## Frequently asked questions

<details><summary><b>How can I see who unfollowed me?</b></summary><br>Complete a scan, keep its locally stored snapshot and scan again later. The app can only confirm changes between saved observations.</details>

<details><summary><b>Can I see accounts that don't follow me now?</b></summary><br>Yes. The <b>Não me seguem</b> tab compares your current following list with your current followers list; it cannot tell when or why somebody unfollowed you.</details>

<details><summary><b>Does the Unfollow button change my Instagram account?</b></summary><br>Yes. After you confirm, it requests the action from Instagram. Check the selected profile before confirming. If a request fails, verify the final state on Instagram.</details>

<details><summary><b>Why is scanning slow or why did Instagram return HTTP 429?</b></summary><br>Instagram may throttle requests. Don't retry continuously; wait before trying again. A partial scan is not a reliable final result.</details>

<details><summary><b>Are my lists uploaded anywhere?</b></summary><br>The project does not run a collection server. Necessary data requests go to Instagram, while results are stored locally in your browser until you or the browser delete them.</details>

<details><summary><b>Does it work on Android?</b></summary><br>The current build targets desktop browsers. Firefox Android compatibility remains under evaluation and no validated APK is available.</details>

<details><summary><b>How can I delete my history?</b></summary><br>Open the Radar Seguidores panel and choose <b>Apagar histórico</b> to delete stored scans for the current Instagram account. Uninstalling the extension is another option.</details>

## Development

Radar Seguidores uses **JavaScript**, Manifest V3 WebExtensions and local browser storage, without a project backend or runtime dependencies.

```bash
git clone https://github.com/pecanela/radar-seguidores.git
cd radar-seguidores
npm test
npm run build
```

Node.js 18+ is required for development. Built packages are placed in `dist/firefox/` and `dist/chromium/`. [GitHub Actions](https://github.com/pecanela/radar-seguidores/actions/workflows/ci.yml) runs tests and builds automatically.

## Roadmap

- [x] Follower/following comparison
- [x] Local history and lost-follower detection between scans
- [x] Firefox and Chromium packages
- [x] Automated tests and GitHub Actions build
- [ ] Live validation of the current release on Firefox, Chrome, Edge and Brave
- [ ] Browser store signing/publication
- [ ] Firefox Android testing
- [ ] English UI localization

## Contributing

Bug fixes, accessibility improvements, translation contributions and tests on additional browsers are welcome. Open an [issue](https://github.com/pecanela/radar-seguidores/issues) or submit a pull request. Never attach cookies, tokens, complete follower lists or other personal information.

See [CONTRIBUTING.md](CONTRIBUTING.md) · [Changelog](CHANGELOG.md) · [Releases](https://github.com/pecanela/radar-seguidores/releases)

---

<p align="center">Licensed under <a href="LICENSE">MIT</a> · Developed and maintained at <a href="https://github.com/pecanela/radar-seguidores">pecanela/radar-seguidores</a>.</p>
<p align="center"><strong>More clarity over your connections — free, open-source and ad-free.</strong></p>
