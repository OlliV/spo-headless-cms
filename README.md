SharePoint Online as a Headless CMS for Next.js
===============================================

It had to be done by someone.

![SPO CMS](/cms.png)

Features
--------

- A front page with a list of all `Article`s from a SharePoint Online site
- An SSG page that generates static pages for all articles
- WebParts supported:
  - `rte`

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

Obviously you'll need to create an application for this in Azure AD.  It's
pretty simple, just create a bare minimum app and create an API token.
Then make `Sites.Read.All` the only API permission for the app.

First you need to figure out the ID of your site. It's a bit tricky to
find, but there is a tool for that

```
node util/find-site.js My site
```

Copy the `id` somewhere, we are going to need it later as a value for
the `SITE_ID` environment variable.

Next up, the actual build:

**The manual way**

Run `get-id.js` to get a temporary authentication token:

```
$ node util/get-id.js
```

Copy the `access_token` printed as we'll need it next.

Now you can run the build:

```
$ ACCESS_TOKEN='YOU_KNOW_THIS' SITE_ID='YOUR_SITE_ID' yarn build
```

**The more automated way**

Just run:

```
./build.sh
```

Finally the result will be in the newly created `out` directory that can be
deployed to production.

If you have `jq` installed and you are using Linux, then things will be a bit
easier for you.

Summary
-------

**Find a site ID:**

```
node ./util/find-site.js My site
```

**To start dev mode:**

```
SITE_ID='YOUR_SITE_ID' ./dev.sh
```

**To run the build:**

```
SITE_ID='YOUR_SITE_ID' ./build.sh
```
