# mytos-telenor

Update users in `Mytos` based on users from `Visma` which has payed phone from us and update *costCentres*

## Payload to Mytos

We only need to update `Email` and `Dim*` (where **\*** represents an incrementing number from 1 for all costCentres on a user)

There can be a maximum of `5` **Dim\*** entries

```json
{
  "Phonenumber": "12345678",
  "Email": "bjarne.betjent@vtfk.no",
  "Dim1": "12345",
  "Dim2": "123"
}
```

## `POST /update`

### Update all users in Mytos

`Body`

No body or query needed

`Response`
```json
{
  "updated": "900 of 900 users updated sucessfully. "
}
```

### Update one person by **firstName**/**lastName**

`Body`
```json
{
  "firstName": "Bjarne",
  "lastName": "Betjent"
}
```

`Response`
```json
{
  "updated": "1 of 1 users updated sucessfully. "
}
```

### Update one person by **ssn**

`Body`
```json
{
  "ssn": "01234567891"
}
```

`Response`
```json
{
  "updated": "1 of 1 users updated sucessfully. "
}
```

## Setup

Create a `.env` file:

### Required environments
```text
VISMA_URL=http://visma-srv:8080/hrm_ws/secure/persons/company/1/start-id/0/end-id/99999999
VISMA_URL_NAME=http://visma-srv:8080/hrm_ws/secure/persons/name/firstname/%firstname%/lastname/%lastname%
VISMA_URL_SSN=http://visma-srv:8080/hrm_ws/secure/persons/ssn/%ssn%
VISMA_USERNAME=<visma-username>
VISMA_PASSWORD=<visma-password>
MYTOS_URL_GET_USERS=https://batchedit.mytos.no/api/users?page=0&size=10000&policies=true
MYTOS_URL_GET_USER=https://batchedit.mytos.no/api/users/%phoneNumber%?policies=true
MYTOS_URL_UPDATE_USERS=https://batchedit.mytos.no/api/users/list
MYTOS_USERNAME=<mytos-customer-key>
MYTOS_PASSWORD=<mytos-api-key>
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

### start

Will get users from `Visma` and `Mytos` API's and update users in `Mytos`

### debug

Same as `start` aswell as save a local copy of `Visma` and `Mytos` data

### demo

Will get users from `Visma` and `Mytos` API's **BUT** will not update `Mytos`

### debug:demo

Will get users from `Visma` and `Mytos` API's aswell as save a local copy of `Visma` and `Mytos` data **BUT** will not update `Mytos`

## Links

[Mytos API](https://batchedit.mytos.no/swagger/ui/index)
