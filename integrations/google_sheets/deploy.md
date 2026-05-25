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
4. Verify `FOLDER_ID` in `apps_script.js` is set to `1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV`, the only approved Drive destination for published weekly plans.
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


## Folder and permission boundary
The only approved publish destination is:

- Folder URL: https://drive.google.com/drive/folders/1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV?usp=drive_link
- Folder ID: `1bXGmaGlUHH25K6O4_WzUAmA8gWR9HjzV`

The agent must not use Drive as a knowledge source. Do not list, inspect, or read Drive contents as part of planning unless the PM explicitly grants permission. The folder is only a write destination after PM approval.

## File title
The payload `title` must use `aa-bb.mm_plan` where `aa` is the start day, `bb` is the end day, and `mm` is the month, for example `01-03.06_plan`.
