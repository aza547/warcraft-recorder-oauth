Deploys an OpenAuth self-hosted OAuth server on Cloudflare with WCR branding.

To see the login page in action:
- https://warcraft-recorder-oauth.alex-kershaw4.workers.dev/password/authorize

OpenAuth Docs:
- https://openauth.js.org/
- https://github.com/toolbeam/openauth

The WCR website is a "single page application" (SPA) by their standards. It would need setup to point to the OAuth server on login. Then some plumbing to handle code exchange and access/refresh tokens as per their docs. Expecting this could solve the problem of having to login every 12 hours on the website.

- Unclear if it makes sense to use this for the app. The username and password auth there works just fine, but having two sources of truth for logins seems a bad idea. I doubt OpenAuth will validate passwords for us on demand, but might be worth looking. There doesn't seem to be a way to [revoke tokens](https://github.com/toolbeam/openauth/issues/249) currently. Also migration of existing users is possibly painful.