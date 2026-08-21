# ISC Flat File Requirements Dashboard

This is a static website documenting the ISC flat-file process, templates, ownership, frequency, and upload paths.

## Repository Structure

- `index.html`: Page structure and section layout.
- `styles.css`: Styling, spacing, and table column widths.
- `app.js`: Dashboard row data and template links.
- `assets/`: Template files, CSV examples, and instructional images.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow.

## Test Locally

From this repository folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

Check that the table loads, template links open, long text wraps correctly, and the mobile layout remains readable.

## Publish to GitHub Pages

1. Push changes to the `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Set the source to **GitHub Actions**.
4. Open **Actions** and confirm the deployment completes.
5. Open the live URL shown in **Settings > Pages**.

If you cannot access repository Settings or Pages, ask a GitHub Enterprise administrator to grant repository settings access or enable GitHub Pages for the repository.

## Release Checklist

- Confirm no sensitive information is exposed.
- Confirm internal-only links are intentional.
- Confirm template links are valid.
- Test the page in an incognito window where appropriate.
- Confirm recent changes appear on the live URL.