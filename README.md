### Setup

Requires node 8.x.

Install dependencies:

```
npm install
```

Copy `sample.env` to `.env` and customize
```bash
cp sample.env .env
```

run `node generate-clients` for data loaded from HMISLynk, this may take awhile.

Alternatively, load use `cp static/client-enrollments-dev.json static/client-enrollments.json` to use the predefined static data for demo purposes.

Run:

```
node index.js
```

Navigate to http://localhost:3000

You will be prompted to login, contact kclough@jarv.us for credentials. Once logged in, you should see client data. 