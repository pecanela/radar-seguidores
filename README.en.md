<p align="center">
  <img src="docs/images/banner.png" alt="Radar Seguidores, free and open-source Instagram follower analysis browser extension" width="100%">
</p>

<p align="center">
  <a href="README.md">🇧🇷 Português</a> · <a href="#english">🇺🇸 English</a> ·
  <a href="https://github.com/pecanela/radar-seguidores/actions">Builds</a> ·
  <a href="LICENSE">MIT License</a>
</p>

<p align="center"><strong>Free · Open source · No ads · Local history · Firefox + Chromium</strong></p>

> **Version:** `v1.1.0-rc` (release candidate). A previous version has been validated on Firefox desktop. This version still needs real-account validation and cross-browser testing. **There is no signed extension, store release or validated Android APK yet.**

<a id="english"></a>

## What is Radar Seguidores?

**Radar Seguidores** is a community-made, unaffiliated browser extension that compares accounts you follow with accounts following you on Instagram. It uses your existing logged-in Instagram browser session instead of asking you to enter your password in a separate service. **The UI is currently in Portuguese**; documentation is available in [Portuguese](README.md) and English.

## Features

| Feature | Description |
|---|---|
| **Não me seguem / Not following back** | Accounts you follow that do not follow you back. |
| **Pararam de seguir / Unfollowed you** | Accounts that followed you in a previous full scan, no longer follow you, and that you still follow. |
| **Me seguem, não sigo / Fans** | Accounts following you that you do not follow back. |
| **Individual unfollow** | One confirmed action per person; no bulk unfollow. |
| **Local history** | Matches accounts by account ID, saves scan history locally and allows you to delete it. |
| **Search** | Filter by name or username. |

> **Historical limitation:** the first scan cannot identify people who unfollowed you *before* it was made. To confirm lost followers you need at least two complete scans at different times.

## Screenshots

<p align="center">
  <img src="docs/images/nao-me-seguem.png" alt="Actual extension UI showing accounts not following you back" width="86%">
  <br><sub>Not following back</sub>
</p>

<p align="center">
  <img src="docs/images/pararam-de-seguir.png" alt="Actual extension UI showing accounts lost between scans" width="48%">
  <img src="docs/images/me-seguem-nao-sigo.png" alt="Actual extension UI showing followers you do not follow" width="48%">
  <br><sub>Unfollowed you · Followers you don't follow</sub>
</p>

*These are screenshots of the **real v1.1 UI** rendered against **synthetic test account data**. No real user's Instagram data appears in these images. The header banner is promotional artwork.*

## Installing a test build

Build artifacts are generated on [GitHub Actions](https://github.com/pecanela/radar-seguidores/actions); the extension is not currently listed in any browser store. Open a successful workflow run and download the appropriate ZIP under **Artifacts** (GitHub sign-in may be required). Extract the ZIP first.

### 🦊 Firefox desktop

1. Download `radar-seguidores-firefox-unsigned` from the most recent successful [Actions](https://github.com/pecanela/radar-seguidores/actions) run and extract it.
2. In Firefox open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**, and choose **`manifest.json`** in the extracted folder.
4. Visit [instagram.com](https://www.instagram.com/), sign in and reload the page.
5. Click **◎ Radar Seguidores** at the bottom right → **Analisar agora** (Scan now).

⚠️ Temporary extensions disappear after Firefox restarts. Permanent installation requires Mozilla signing.

### 🌐 Chrome, Edge, Brave desktop

1. Download `radar-seguidores-chromium` from the most recent successful [Actions](https://github.com/pecanela/radar-seguidores/actions) run and extract it.
2. Navigate to `chrome://extensions`, `edge://extensions` or `brave://extensions`.
3. Enable **Developer mode** → **Load unpacked** → select the extracted folder containing `manifest.json`.
4. Visit [instagram.com](https://www.instagram.com/), sign in, refresh and open **◎ Radar Seguidores**.

### 📱 Android

The Firefox Android version is **not yet tested**, and there is no validated Android APK. Standard Chrome Android does not support regular desktop extensions.

## Compatibility

| Browser | Desktop | Android |
|---|---|---|
| Firefox | Previous version validated; v1.1 needs retesting | Untested; signing/compatibility required |
| Chrome | Build available, not validated with real account | Standard extension unsupported |
| Edge | Build available, not validated with real account | Untested |
| Brave | Build available, not validated with real account | Regular mobile extension installation unavailable |

## Privacy and safety

- Scans and history are stored **locally in the extension**. No project-operated data collection server or advertising.
- Uses your **existing Instagram browser session**. Never share your passwords, cookies or authentication tokens in issues.
- Calls **unofficial internal Instagram interfaces** which may change, stop working, be rate-limited or trigger account restrictions.
- Does not bulk-unfollow. Every individual unfollow requires confirmation. Verify the account before taking action.
- Incomplete scans are not accepted as full scans; safeguards reduce, but cannot eliminate, false positives.
- Public source code does **not** mean a security certification or endorsement by Meta.

Read the [privacy policy (Portuguese)](docs/PRIVACIDADE.md), [security notes (Portuguese)](docs/SEGURANCA.md) and [release checklist (Portuguese)](docs/PUBLICACAO.md).

## Build and test

Requires **Node.js 18+**, with no npm runtime dependencies:

```bash
npm test
npm run build
```

The generated folders are `dist/firefox/` and `dist/chromium/` (gitignored). CI runs tests and builds unsigned artifacts on [GitHub Actions](https://github.com/pecanela/radar-seguidores/actions).

## Contributing

Bug fixes, localized UI translations, browser compatibility tests and pull requests are welcome. Please do **not** share any real usernames, cookies or other personal details in issues. See [CONTRIBUTING.md](CONTRIBUTING.md) (Portuguese) and [Issues](https://github.com/pecanela/radar-seguidores/issues).

## License

Distributed under the [MIT License](LICENSE).

**Independent project. Not affiliated with, sponsored by or endorsed by Meta or Instagram.** Use at your own risk and observe the policies applicable to your Instagram account.
