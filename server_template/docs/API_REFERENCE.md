## Functions

<dl>
<dt><a href="#getAccounts">getAccounts(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the GET /api/accounts request.
Returns a list of all the accounts in the database.</p>
</dd>
<dt><a href="#createAccount">createAccount(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the POST /api/accounts/createAccount request.
Validates the request body and calls the account service to create a new account.</p>
</dd>
<dt><a href="#updateMonthlyHistory">updateMonthlyHistory(req, res, next)</a> ⇒ <code>Response</code></dt>
<dd><p>Handles the PUT /api/accounts/history request.
Validates the request body and calls the account service to create a new account.</p>
</dd>
<dt><a href="#listUserAccounts">listUserAccounts(req, res, next)</a></dt>
<dd><p>Handles the GET request to retrieve all accounts for a specific user.</p>
</dd>
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
<dt><a href="#findAccountById">findAccountById(ownerId)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Compares accounts in the db with the ownerId and returns the matching account.</p>
</dd>
<dt><a href="#getAllAccounts">getAllAccounts()</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Get all accounts stored in the db.</p>
</dd>
<dt><a href="#createAccount">createAccount(name, type)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Create a new account, for an associated user.</p>
</dd>
<dt><a href="#updateMonthlyHistory">updateMonthlyHistory(accountId, monthKey, openingBalance, contribution, interestRate, termsLeft, closingBalance)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Updates an existing monthly history record or creates a new one for an account.
Dynamically selects SAVING or LOAN account to update.</p>
</dd>
<dt><a href="#getUserAccounts">getUserAccounts(ownerId)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Retrieves all financial accounts associated with a given user ID.</p>
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

<a name="getAccounts"></a>

## getAccounts(req, res, next) ⇒ <code>Response</code>
Handles the GET /api/accounts request.
Returns a list of all the accounts in the database.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="createAccount"></a>

## createAccount(req, res, next) ⇒ <code>Response</code>
Handles the POST /api/accounts/createAccount request.
Validates the request body and calls the account service to create a new account.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success, with a success, message and data.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object, expecting 'name', 'ownerId', and 'type' in the body. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="updateMonthlyHistory"></a>

## updateMonthlyHistory(req, res, next) ⇒ <code>Response</code>
Handles the PUT /api/accounts/history request.
Validates the request body and calls the account service to create a new account.

**Kind**: global function  
**Returns**: <code>Response</code> - 201 Created on success, with a success, message and data.  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object, expecting 'accountId', 'monthKey', 'openingBalance', 'contribution', 'interestRate', 'termsLeft' and 'closingBalance' in the body. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

<a name="listUserAccounts"></a>

## listUserAccounts(req, res, next)
Handles the GET request to retrieve all accounts for a specific user.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | The Express request object. Expects ownerId in req.params. |
| res | <code>object</code> | The Express response object. |
| next | <code>function</code> | The next middleware function. |

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

<a name="findAccountById"></a>

## findAccountById(ownerId) ⇒ <code>Promise.&lt;object&gt;</code>
Compares accounts in the db with the ownerId and returns the matching account.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing user data  

| Param | Type | Description |
| --- | --- | --- |
| ownerId | <code>string</code> | The id of the user. |

<a name="getAllAccounts"></a>

## getAllAccounts() ⇒ <code>Promise.&lt;object&gt;</code>
Get all accounts stored in the db.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status and user data, or an error message.  
**Throws**:

- <code>Error</code> Throws if token signing or database connection fails.

<a name="createAccount"></a>

## createAccount(name, type) ⇒ <code>Promise.&lt;object&gt;</code>
Create a new account, for an associated user.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status, and user data, or an error message.  
**Throws**:

- <code>Error</code> Throws if token signing or database connection fails.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The user's name (used as the primary identifier for login). |
| type | <code>string</code> | The account type. |

<a name="updateMonthlyHistory"></a>

## updateMonthlyHistory(accountId, monthKey, openingBalance, contribution, interestRate, termsLeft, closingBalance) ⇒ <code>Promise.&lt;object&gt;</code>
Updates an existing monthly history record or creates a new one for an account.
Dynamically selects SAVING or LOAN account to update.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object indicating success and the updated monthly record.  

| Param | Type | Description |
| --- | --- | --- |
| accountId | <code>number</code> | The unique ID of the account to modify. |
| monthKey | <code>string</code> | The month identifier (YYYY-MM). |
| openingBalance | <code>number</code> | The total contribution for the month. |
| contribution | <code>number</code> | The total contribution for the month. |
| interestRate | <code>number</code> | The interestRate for the month. |
| termsLeft | <code>number</code> | The termsLeft in months. |
| closingBalance | <code>number</code> | The total contribution for the month. |

<a name="getUserAccounts"></a>

## getUserAccounts(ownerId) ⇒ <code>Promise.&lt;object&gt;</code>
Retrieves all financial accounts associated with a given user ID.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - An object containing success status and an array of accounts,
or a message if the user has no accounts.  

| Param | Type | Description |
| --- | --- | --- |
| ownerId | <code>number</code> | The ID of the user whose accounts are being fetched. |

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

