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

## Links

[Mytos API](https://batchedit.mytos.no/swagger/ui/index)
