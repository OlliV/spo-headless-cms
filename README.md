SharePoint Online as a Headless CMS for Next.js
===============================================

It had to be done by someone.

![SPO CMS](/cms.png)

Building
--------

Create a file called `tenant.json` with the following properties
(and never deploy this to production):

```js
{
    "tenantId": "YOUR_TENANT_ID",
    "clientID": "YOUR_CLIENT_ID",
    "clientSecret": "YOUR_CLIENT_SECRET"
}
```

Run `get-id.js` to get a temporary authentication token:

```
$ node get-id.js
```

Copy the `access_token` printed as we'll need it next.

Now you can run the build:

```
$ ACCESS_TTOKEN='YOU_KNOW_THIS' SITE_ID='YOUR_SITE_ID' yarn build
```

The `SITE_ID` is a bit trickier to get, one way is to use the
[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer#)
and use the site search endpoint:
`GET https://graph.microsoft.com/v1.0/sites?search=human%20readable%20name`.
There you should find a property called `id` which you can use directly.

Finally the result will be in the newly created `out` directory that can be
deployed to production.
