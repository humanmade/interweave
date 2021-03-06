# Interweave with Autolinking

> Provides URL, IP, email, and hashtag autolinking support for
[Interweave](https://github.com/milesj/interweave).

Autolinking is the concept of matching patterns within a string and wrapping the matched
result in an anchor link. This process is achieved with Interweave matchers.

> Note: The regex patterns used in autolinking do not conform to their official RFC
> specifications, as we need to take into account word boundaries, punctuation, and more.
> Instead, the patterns will do their best to match against the majority of common use cases.

## Requirements

* React 15/16+
* Interweave

## Installation

```
npm install interweave interweave-autolink --save
// Or
yarn add interweave interweave-autolink
```

## Documentation

* [URLs](#urls)
  * [TLD Support](#tld-support)
  * [Props](#props)
  * [Match Result](#match-result)
* [IPs](#ips)
  * [Props](#props-1)
  * [Match Result](#match-result-1)
* [Emails](#emails)
  * [Props](#props-2)
  * [Match Result](#match-result-2)
* [Hashtags](#hashtags)
  * [Props](#props-3)
  * [Match Result](#match-result-3)

### URLs

The `UrlMatcher` will match most variations of a URL and its segments. This includes the protocol,
user and password auth, host, port, path, query, and fragment.

```javascript
import Interweave from 'interweave';
import { UrlMatcher } from 'interweave-autolink';

<Interweave matchers={[new UrlMatcher('url')]} />
```

#### TLD Support

By default, the `UrlMatcher` will validate top-level domains against a whitelist of the most
common TLDs (like .com, .net, and countries). You can disable this validation with the
`validateTLD` option.

```javascript
new UrlMatcher('url', { validateTLD: false });
```

Or you can provide a whitelist of additional TLDs to validate with.

```javascript
new UrlMatcher('url', { customTLDs: ['life', 'tech', 'ninja'] });
```

#### Props

The following props are available for `Url` components, all of which should be passed
to an `Interweave` instance.

* `newWindow` (bool) - Open links in a new window. Defaults to `false`.
* `onClick` (func) - Callback triggered when a link is clicked.

#### Match Result

If a match is found, a `Url` component will be rendered and passed the following props.

* `children` (string) - The entire URL/IP that was matched.
* `urlParts` (object)
  * `scheme` (string) - The protocol. Defaults to "http".
  * `auth` (string) - The username and password authorization,
    excluding `@`.
  * `host` (string) - The host, domain, or IP address.
  * `port` (number) - The port number.
  * `path` (string) - The path.
  * `query` (string) - The query string.
  * `fragment` (string) - The hash fragment, including `#`.

### IPs

The `UrlMatcher` does not support IP based hosts as I wanted a clear distinction between
supporting these two patterns separately. To support IPs, use the `IpMatcher`, which will
match hosts that conform to a valid IPv4 address (IPv6 not supported). Like the `UrlMatcher`,
all segments are included.

```javascript
import Interweave from 'interweave';
import { IpMatcher } from 'interweave-autolink';

<Interweave matchers={[new IpMatcher('ip')]} />
```

#### Props

The following props are available for `Ip` components, all of which should be passed
to an `Interweave` instance.

* `newWindow` (bool) - Open links in a new window. Defaults to `false`.
* `onClick` (func) - Callback triggered when a link is clicked.

#### Match Result

If a match is found, an `Ip` component is rendered with the same props as `Url`.

### Emails

The `EmailMatcher` will match an email address and link it using a "mailto:" target.

```javascript
import Interweave from 'interweave';
import { EmailMatcher } from 'interweave-autolink';

<Interweave matchers={[new EmailMatcher('email')]} />
```

#### Props

The following props are available for `Email` components, all of which should be passed
to an `Interweave` instance.

* `onClick` (func) - Callback triggered when a link is clicked.

#### Match Result

If a match is found, an `Email` component will be rendered and passed the following props.

* `children` (string) - The entire email address that was matched.
* `emailParts` (object)
  * `username` (string) - The username. Found before the `@`.
  * `host` (string) - The host or domain. Found after the `@`.

### Hashtags

The `HashtagMatcher` will match a common hashtag (like Twitter and Instagram) and link to
it using a custom URL (passed as a prop). Hashtag matching supports alpha-numeric (`a-z0-9`),
underscore (`_`), and dash (`-`) characters, and must start with a `#`.

```javascript
import Interweave from 'interweave';
import { HashtagMatcher } from 'interweave-autolink';

<Interweave matchers={[new HashtagMatcher('hashtag')]} />
```

#### Props

The following props are available for `Hashtag` components, all of which should be passed
to an `Interweave` instance.

* `encodeHashtag` (bool) - Encodes the hashtag using `encodeURIComponent`. Defaults to `false`.
* `hashtagUrl` (string | func) - The URL to interpolate the matched hashtag with.
* `newWindow` (bool) - Open links in a new window. Defaults to `false`.
* `preserveHash` (bool) - Preserve the leading hash (`#`) when interpolating into a URL.
  Defaults to `false`.
* `onClick` (func) - Callback triggered when a link is clicked.

Hashtags require a URL to link to, which is defined by the `hashtagUrl` prop. The URL must
declare the following token, `{{hashtag}}`, which will be replaced by the matched hashtag.
Or a function can be passed, which receives the hashtag as the 1st argument.

```javascript
<Interweave
  hashtagUrl="https://twitter.com/hashtag/{{hashtag}}"
  matchers={[new HashtagMatcher('hashtag')]}
/>

// OR

<Interweave
  hashtagUrl={hashtag => `https://twitter.com/hashtag/${hashtag}`}
  matchers={[new HashtagMatcher('hashtag')]}
/>
```

#### Match Result

If a match is found, a `Hashtag` component will be rendered and passed the following props.

* `children` (string) - The entire hashtag that was matched.
* `hashtagName` (string) - The hashtag name without `#`.
