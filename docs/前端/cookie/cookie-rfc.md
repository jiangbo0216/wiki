### [cookie example](https://tools.ietf.org/html/rfc6265#page-6)

3.1.  Examples

   Using the Set-Cookie header, a server can send the user agent a short
   string in an HTTP response that the user agent will return in future
   HTTP requests that are within the scope of the cookie.  For example,
   the server can send the user agent a "session identifier" named SID
   with the value 31d4d96e407aad42.  The user agent then returns the
   session identifier in subsequent requests.


   == Server -> User Agent ==

```
   Set-Cookie: SID=31d4d96e407aad42

```
   == User Agent -> Server ==

```
   Cookie: SID=31d4d96e407aad42

```
   The server can alter the default scope of the cookie using the Path
   and Domain attributes.  For example, the server can instruct the user
   agent to return the cookie to every path and every subdomain of
   example.com.

   == Server -> User Agent ==

```
   Set-Cookie: SID=31d4d96e407aad42; Path=/; Domain=example.com

```
   == User Agent -> Server ==

```
   Cookie: SID=31d4d96e407aad42

```
   As shown in the next example, the server can store multiple cookies
   at the user agent.  For example, the server can store a session
   identifier as well as the user's preferred language by returning two
   Set-Cookie header fields.  Notice that the server uses the Secure and
   HttpOnly attributes to provide additional security protections for
   the more sensitive session identifier (see Section 4.1.2.)

   == Server -> User Agent ==

```
   Set-Cookie: SID=31d4d96e407aad42; Path=/; Secure; HttpOnly
   Set-Cookie: lang=en-US; Path=/; Domain=example.com

```
   == User Agent -> Server ==

```
   Cookie: SID=31d4d96e407aad42; lang=en-US

```
   Notice that the Cookie header above contains two cookies, one named
   SID and one named lang.  If the server wishes the user agent to
   persist the cookie over multiple "sessions" (e.g., user agent
   restarts), the server can specify an expiration date in the Expires
   attribute.  Note that the user agent might delete the cookie before
   the expiration date if the user agent's cookie store exceeds its
   quota or if the user manually deletes the server's cookie.


   == Server -> User Agent ==

```
   Set-Cookie: lang=en-US; Expires=Wed, 09 Jun 2021 10:18:14 GMT

```
   == User Agent -> Server ==

```
   Cookie: SID=31d4d96e407aad42; lang=en-US

```
   Finally, to remove a cookie, the server returns a Set-Cookie header
   with an expiration date in the past.  The server will be successful
   in removing the cookie only if the Path and the Domain attribute in
   the Set-Cookie header match the values used when the cookie was
   created.

   == Server -> User Agent ==

```
   Set-Cookie: lang=; Expires=Sun, 06 Nov 1994 08:49:37 GMT

```
   == User Agent -> Server ==

```
   Cookie: SID=31d4d96e407aad42

```