# Items API — Azure Functions (C#, .NET 8 isolated) + MySQL

A "bring your own API" backend for Azure Static Web Apps. Provides full CRUD
over a `MYSQL_CONNECTION_STRING`, using MySqlConnector + Dapper.

## Project layout

```
mysql-crud-api/
├── MyApi.csproj
├── Program.cs
├── host.json
├── local.settings.json          # local dev only, never deployed
├── schema.sql                   # run this against your MySQL DB once
├── staticwebapp.config.json.example
├── Models/
│   └── Item.cs
├── Data/
│   └── DbConnectionFactory.cs
└── Functions/
    └── ItemsFunctions.cs
```

## Endpoints

| Method | Route              | Description        |
|--------|--------------------|---------------------|
| GET    | /api/items         | List all items      |
| GET    | /api/items/{id}    | Get one item        |
| POST   | /api/items         | Create an item       |
| PUT    | /api/items/{id}    | Update an item       |
| DELETE | /api/items/{id}    | Delete an item       |

Request/response body shape:
```json
{ "name": "Widget", "description": "optional text", "price": 9.99 }
```

## 1. Set up the database

Run `schema.sql` against your Azure Database for MySQL (Flexible Server)
instance — via the Azure Portal's query editor, `mysql` CLI, or a GUI tool.
It creates the `Items` table and inserts two sample rows.

## 2. Local development

Prerequisites: [.NET 8 SDK](https://dotnet.microsoft.com/download), the
[Azure Functions Core Tools v4](https://learn.microsoft.com/azure/azure-functions/functions-run-local),
and the [SWA CLI](https://azure.github.io/static-web-apps-cli/) if you want to
test alongside a frontend.

1. Edit `local.settings.json` and point `MYSQL_CONNECTION_STRING` at your dev
   database (local MySQL or a dev instance in Azure).
2. Restore and run:
   ```bash
   dotnet restore
   func start
   ```
3. Test directly:
   ```bash
   curl http://localhost:7071/api/items
   ```
4. To test through Static Web Apps' emulator (adds auth, routing, and merges
   with your frontend dev server):
   ```bash
   swa start http://localhost:3000 --api-location http://localhost:7071
   ```

## 3. Connection string & auth options

Two ways to authenticate to MySQL, in order of preference:

**Option A — Managed Identity (recommended for production).**
Azure Database for MySQL Flexible Server supports Entra ID authentication.
Enable it on the server, create a database user mapped to the Function App's
managed identity, and build a connection string without a password — MySqlConnector
will use a Bearer token you fetch via `Azure.Identity` at connection time.
This avoids storing credentials anywhere. Ask me if you want this wired in;
it needs a small change to `DbConnectionFactory` and requires Standard/Premium
Function App hosting (not Consumption) for Entra ID token support to be reliable.

**Option B — Connection string with username/password (simpler to start).**
Store it as a Function App application setting, ideally as a **Key Vault
reference** rather than a plain value:
```
MYSQL_CONNECTION_STRING = @Microsoft.KeyVault(SecretUri=https://your-vault.vault.azure.net/secrets/mysql-conn/)
```
This keeps the real secret in Key Vault; the Function App just resolves it at
startup.

Either way, your MySQL server's firewall must allow the Function App's
outbound IPs, or you should place both behind a VNet (Flex Consumption plan
supports VNet integration).

## 4. Deploy the Function App

```bash
# from mysql-crud-api/
func azure functionapp publish <your-function-app-name>
```
Or wire it into a CI/CD pipeline (GitHub Actions / Azure DevOps) — happy to
generate that workflow file too if you want.

Set the app setting in Azure:
```bash
az functionapp config appsettings set \
  --name <your-function-app-name> \
  --resource-group <your-rg> \
  --settings MYSQL_CONNECTION_STRING="<your-connection-string-or-keyvault-ref>"
```

## 5. Link it to your Static Web App

In the Azure Portal: your Static Web App → **APIs** → **Link** →
select this Function App. Once linked, SWA automatically proxies any
`/api/*` request from your frontend to this Function App, and injects the
`x-ms-client-principal` header for authenticated users if you use SWA's
built-in auth.

If you want certain writes restricted to logged-in users, copy
`staticwebapp.config.json.example` to `staticwebapp.config.json` at the
**root of your frontend app** (not this API project) and adjust the routes.

## Notes

- CORS in `local.settings.json` is set for the default SWA CLI port
  (`http://localhost:4280`) — adjust if your frontend dev server differs.
- All SQL uses parameterized queries via Dapper, so it's safe from SQL
  injection as written — keep it that way when you add more endpoints.
- If you outgrow hand-rolled CRUD, this is also a reasonable point to
  reconsider a self-hosted Data API builder container instead — but for a
  single table or a handful of custom endpoints, this Functions approach is
  usually simpler to reason about and cheaper to run.
