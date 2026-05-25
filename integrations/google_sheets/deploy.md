# Google Sheets Renderer Deployment

This integration uses a Google Apps Script web app as the canonical renderer for the weekly logistics spreadsheet.

## Files
- `apps_script.js` — renderer code.
- `appsscript.json` — Apps Script manifest.
- `webhook_client.py` — local/agent-side client that posts the internal plan payload to the deployed web app.

## Deployment steps
1. Create a Google Apps Script project.
2. Copy `apps_script.js` into `Code.gs`.
3. Copy `appsscript.json` into the project manifest.
4. Set `FOLDER_ID` in `apps_script.js` to the designated Google Drive folder for generated weekly plans.
5. Deploy as a web app that can receive POST requests from the agent runtime.
6. Store the web app URL as `GOOGLE_SHEETS_WEBHOOK_URL`.

## Runtime contract
POST a JSON payload matching `schemas/weekly_plan.schema.json`. The renderer returns:

```json
{ "status": "ok", "url": "https://docs.google.com/spreadsheets/...", "id": "..." }
```

On failure it returns:

```json
{ "status": "error", "message": "..." }
```
