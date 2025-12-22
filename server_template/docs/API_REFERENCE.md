## Functions

<dl>
<dt><a href="#getUsers">getUsers(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the GET /api/users request.
Returns a list of all the users in the database.</p>
</dd>
<dt><a href="#registerUser">registerUser(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the POST /api/users/registerUser request.
Validates the request body and calls the user service to create a new user.</p>
</dd>
<dt><a href="#loginUser">loginUser(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the POST /api/users/LoginUser request.
Validates the request body and calls the user service to create a new user.</p>
</dd>
<dt><a href="#findUserByName">findUserByName(name)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Compares users in the db with the user and returns the match.</p>
</dd>
<dt><a href="#getAllUsers">getAllUsers()</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Get all users stored in the db.</p>
</dd>
<dt><a href="#hashSecret">hashSecret(name, storedHash)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Hash a plain text secret.</p>
</dd>
<dt><a href="#compareSecret">compareSecret(plainSecret, storedHash)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Compares a plain text secret against a stored hash.</p>
</dd>
<dt><a href="#createUser">createUser(name)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Create a new user, if there is no matching user.</p>
</dd>
<dt><a href="#loginUser">loginUser(name)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Finds a user by name, compares the secret, and generates a JWT upon successful authentication.</p>
</dd>
</dl>

<a name="getUsers"></a>

## getUsers(req, res, next) ⇒ <code>Response</code>
Handles the GET /api/users request.
Returns a list of all the users in the database.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="registerUser"></a>

## registerUser(req, res, next) ⇒ <code>Response</code>
Handles the POST /api/users/registerUser request.
Validates the request body and calls the user service to create a new user.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success, with a success, message and data.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object, expecting 'name', 'username', and 'secret' in the body. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="loginUser"></a>

## loginUser(req, res, next) ⇒ <code>Response</code>
Handles the POST /api/users/LoginUser request.
Validates the request body and calls the user service to create a new user.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success, with a success, message and data.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object, expecting 'name' in the body. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="findUserByName"></a>

## findUserByName(name) ⇒ <code>Promise.&lt;object&gt;</code>
Compares users in the db with the user and returns the match.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing user data  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name provided by the user. |

<a name="getAllUsers"></a>

## getAllUsers() ⇒ <code>Promise.&lt;object&gt;</code>
Get all users stored in the db.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status and user data, or an error message.  
**Throws**:

- <code>Error</code> Throws if token signing or database connection fails.

<a name="hashSecret"></a>

## hashSecret(name, storedHash) ⇒ <code>Promise.&lt;string&gt;</code>
Hash a plain text secret.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - Hashed Value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The password provided by the user. |
| storedHash | <code>string</code> | The hashed password retrieved from the database. |

<a name="compareSecret"></a>

## compareSecret(plainSecret, storedHash) ⇒ <code>Promise.&lt;boolean&gt;</code>
Compares a plain text secret against a stored hash.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - True if the secrets match, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| plainSecret | <code>string</code> | The password provided by the user. |
| storedHash | <code>string</code> | The hashed password retrieved from the database. |

<a name="createUser"></a>

## createUser(name) ⇒ <code>Promise.&lt;object&gt;</code>
Create a new user, if there is no matching user.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status, and user data, or an error message.  
**Throws**:

- <code>Error</code> Throws if token signing or database connection fails.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The user's name (used as the primary identifier for login). |

<a name="loginUser"></a>

## loginUser(name) ⇒ <code>Promise.&lt;object&gt;</code>
Finds a user by name, compares the secret, and generates a JWT upon successful authentication.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status, token, and user data, or an error message.  
**Throws**:

- <code>Error</code> Throws if token signing or database connection fails.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The user's name (used as the primary identifier for login). |

