# mytos-telenor

Update users in `Mytos` based on users from `Visma` which has payed phone from us and update *costCentres*

## Payload to Mytos

`Email`, `EmployeeId` and `Dim*` (where **\*** represents an incrementing number from 1 for all costCentres on a user) will be updated

> `dimension1` from **costCentres** will be ignored as we don't use it. We will use `dimension2` and forward

There can be a maximum of `5` **Dim\*** entries

```json
{
  "Phonenumber": "12345678",
  "Email": "bjarne.betjent@vtfk.no",
  "EmployeeId": "01122201",
  "Dim1": "12345",
  "Dim2": "123"
}
```

## Update users in Mytos (based on Visma)

Use argument `--DEMO=true` to prevent updating Mytos (files saved to ./data/demo)

Use argument `--debug=true` to save additional information from visma (files saved to ./data/debug)

### Update all users

`ALL` will use the **ALL_VISMA_URL** from environments, so make sure *start-id* is set to `0` and *end-id* is set to `99999999`

#### In `PROD`

> node index.js --env=PROD --visma=ALL

#### In `TEST`

> node index.js --env=TEST --visma=ALL

### Update selected users

`SELECTED` will use the **SELECTED_VISMA_URL** from environments, so make sure to update it to correct *start-id* and *end-id*

#### In `PROD`

> node index.js --env=PROD --visma=SELECTED

#### In `TEST`

> node index.js --env=TEST --visma=SELECTED

## Setup

Create a `.env` file:

### Required environments
```text
# Visma API PROD
ALL_VISMA_URL=http://visma-srv:8080/hrm_ws/secure/persons/company/1/start-id/0/end-id/99999999

# Visma API TEST
SELECTED_VISMA_URL=http://visma-srv:8080/hrm_ws/secure/persons/company/1/start-id/01010101/end-id/01010101

# Visma API Shared
VISMA_URL_NAME=http://visma-srv:8080/hrm_ws/secure/persons/name/firstname/%firstname%/lastname/%lastname%
VISMA_URL_SSN=http://visma-srv:8080/hrm_ws/secure/persons/ssn/%ssn%
VISMA_USERNAME=<visma-username>
VISMA_PASSWORD=<visma-password>

# Mytos API Shared
MYTOS_URL_GET_USERS=https://batchedit.mytos.no/api/users?page=0&size=10000&policies=true
MYTOS_URL_GET_USER=https://batchedit.mytos.no/api/users/%phoneNumber%?policies=true
MYTOS_URL_UPDATE_USERS=https://batchedit.mytos.no/api/users/list

# Mytos API PROD
PROD_MYTOS_USERNAME=<mytos-customer-key-prod>
PROD_MYTOS_PASSWORD=<mytos-api-key-prod>

# Mytos API TEST
TEST_MYTOS_USERNAME=<mytos-customer-key-test>
TEST_MYTOS_PASSWORD=<mytos-api-key-test>
```

### Optional environments
```text
PAPERTRAIL_HOST=<papertrail-host>
PAPERTRAIL_TOKEN=<papertrail-token>
TEAMS_WEBHOOK_URL=<webhook-url>
NODE_ENV=production
```

> Add `PAPERTRAIL_*` + `NODE_ENV` to activate logging to papertrail

> Add `TEAMS_WEBHOOK_URL` + `NODE_ENV` to activate logging to teams (***by default only warnings and errors***)

## Scripts

### prod:all

Will get all users from `Visma` and `Mytos` (PROD) and update users in `Mytos`
```bash
npm run prod:all
```

### debug:prod:all

Same as `prod:all` aswell as save a local copy of `Visma` and `Mytos` (PROD) data
```bash
npm run debug:prod:all
```

### demo:prod:all

Will get all users from `Visma` and `Mytos` (PROD) **BUT** will not update `Mytos`
```bash
npm run demo:prod:all
```

### debug:demo:prod:all

Will get all users from `Visma` and `Mytos` (PROD) aswell as save a local copy of `Visma` and `Mytos` (PROD) data **BUT** will not update `Mytos`
```bash
npm run debug:demo:prod:all
```

### test:all

Will get all users from `Visma` and `Mytos` (TEST) and update users in `Mytos`
```bash
npm run test:all
```

### debug:test:all

Same as `test:all` aswell as save a local copy of `Visma` and `Mytos` (TEST) data
```bash
npm run debug:test:all
```

### demo:test:all

Will get all users from `Visma` and `Mytos` (TEST) **BUT** will not update `Mytos`
```bash
npm run demo:test:all
```

### debug:demo:test:all

Will get all users from `Visma` and `Mytos` (TEST) aswell as save a local copy of `Visma` and `Mytos` (TEST) data **BUT** will not update `Mytos`
```bash
npm run debug:demo:test:all
```

### prod:selected

Will get selected users from `Visma` and `Mytos` (PROD) and update users in `Mytos`
```bash
npm run prod:selected
```

### debug:prod:selected

Same as `prod:selected` aswell as save a local copy of `Visma` and `Mytos` (PROD) data
```bash
npm run debug:prod:selected
```

### demo:prod:selected

Will get selected users from `Visma` and `Mytos` (PROD) **BUT** will not update `Mytos`
```bash
npm run demo:prod:selected
```

### debug:demo:prod:selected

Will get selected users from `Visma` and `Mytos` (PROD) aswell as save a local copy of `Visma` and `Mytos` (PROD) data **BUT** will not update `Mytos`
```bash
npm run debug:demo:prod:selected
```

### test:selected

Will get selected users from `Visma` and `Mytos` (TEST) and update users in `Mytos`
```bash
npm run test:selected
```

### debug:test:selected

Same as `test:selected` aswell as save a local copy of `Visma` and `Mytos` (TEST) data
```bash
npm run debug:test:selected
```

### demo:test:selected

Will get selected users from `Visma` and `Mytos` (TEST) **BUT** will not update `Mytos`
```bash
npm run demo:test:selected
```

### debug:demo:test:selected

Will get selected users from `Visma` and `Mytos` (TEST) aswell as save a local copy of `Visma` and `Mytos` (TEST) data **BUT** will not update `Mytos`
```bash
npm run debug:demo:test:selected
```

## Links

[Mytos API](https://batchedit.mytos.no/swagger/ui/index)
