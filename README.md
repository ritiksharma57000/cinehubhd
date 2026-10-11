# CineHubHD Official — Firebase + GitHub Pages

This project contains a public release homepage (`index.html`) and an admin page (`admin.html`). Movies are stored in Cloud Firestore. The public homepage listens to published records in real time, so adding/editing/deleting a listing in the admin panel updates the feed automatically. This site lists trailers and authorized viewing/info links; it does not host movie files.

## 1. Create Firebase project
1. Open https://console.firebase.google.com/ and create a project.
2. In Project settings → General → Your apps, add a **Web app** and copy its Firebase config.
3. Replace all `PASTE_...` placeholders in `firebase.js` with your project's actual values. The web config is not a secret; do not put service-account private keys in this repository.
4. In Authentication → Sign-in method, enable **Email/Password**.
5. In Authentication → Users, add your admin account (email + a strong password). Do not create a public sign-up form.
6. Open that user and copy the **UID**.
7. In Firestore Database, create a database (production mode is fine).
8. Open Firestore → Rules, paste `firestore.rules`, replace `REPLACE_WITH_ADMIN_UID` with your exact admin UID, and Publish the rules. Never use open rules such as `allow read, write: if true`.

## 2. Configure authorized domains
In Firebase Authentication → Settings → Authorized domains, ensure your GitHub Pages host is allowed (for example, `YOUR-USERNAME.github.io`). Add it if the console requires it.

## 3. Upload to GitHub Pages
Upload these files to the root of the same GitHub repository:
- `index.html`
- `admin.html`
- `firebase.js`
- `firestore.rules` (reference copy; publishing it to GitHub does not deploy rules)

Commit to `main`. In repository Settings → Pages, choose Deploy from a branch → `main` → `/(root)`. Wait for the deployment to finish.

## 4. Open admin panel
Visit `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/admin.html`, sign in using the Firebase admin user, then add a release. Set **Publish on public homepage** to show it. The homepage reads only records where `published` is `true`. Use HTTPS URLs for poster, trailer, and authorized watch/info links.

## Movie fields
- Required: title
- Optional: year, type, language, genres, tags, poster URL, official trailer URL, authorized watch/info URL, description, featured, published
- Public homepage: live-updating Firestore query on `published == true`, newest first

## Troubleshooting
- **Firebase not configured:** replace every placeholder in `firebase.js`.
- **auth/unauthorized-domain:** add your GitHub Pages host in Firebase Authentication → Settings → Authorized domains.
- **Missing or insufficient permissions:** verify the UID in `firestore.rules` matches the signed-in admin and publish the rules.
- **Homepage empty:** add a listing and check “Publish on public homepage”. Firestore's query also orders by `createdAt`; new records created by this admin include it.
- **Rules deployment:** editing `firestore.rules` in GitHub does not deploy it; paste/publish it in the Firebase Console or deploy via Firebase CLI.

## Security notes
- Only the UID listed in Firestore rules can create/edit/delete/read unpublished records. Public visitors can read only published records.
- The Firebase web API key is public client configuration. Security comes from Authentication and Firestore Security Rules, not from hiding the config.
- Keep the Firebase admin account private, use a strong unique password, and never commit service-account JSON files.
- GitHub Pages is static hosting; Firestore is the backend. No server is required for this basic admin CRUD workflow.
