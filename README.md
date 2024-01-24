<img width="1400" alt="Screenshot 2024-01-23 at 11 08 46 AM" src="https://github.com/descope-sample-apps/descope-amplify-appsync/assets/32936811/1076e6ff-11ee-4d5e-bdd1-02839b8c4843">

---

This project demonstrates how to integrate Descope with a Next.js application using AWS Amplify and GraphQL. It showcases the use of Descope as an OpenID Connect (OIDC) provider for robust authorization controls to your GraphQL backend.

> If you're looking for how to use Descope in Angular apps with AppSync, you can reference an example app that one of our customers built with our Angular SDK [here](https://github.com/devlimelabs/descope-oidc-amplify-angular).

## Table of Contents 📝

1. [Getting Started](#getting-started)
2. [Issue Reporting](#issue-reporting)
3. [LICENSE](#license)

## Getting Started 💿

Since this app was auto-created with `amplify init` and is tied to a specific sandbox AWS environment. This app is designed to give you example source code to use for implementation of Descope in your own applications. 

To get started actually running this, you'll need to set up your own instance of this app. Follow these steps to create a similar app for yourself, tied to your own AWS instance:

### 1. Setup Your Repository

Follow the [official Amplify setup guide](https://docs.amplify.aws/nextjs/start/getting-started/setup/) to prepare your repository.

### 2. Create a GraphQL API and Database

In your application directory, run:

```bash
amplify add api
```

Follow the prompts:
- **Service**: Choose `GraphQL`.
- **Schema template**: Select `Single object with fields (e.g., "Todo" with ID, name, description)`.

Press enter to accept the schema and proceed.

### 3. Deploy the API

Deploy your backend with the following command:

```bash
amplify push
```

### 4. Integrate Descope OIDC Provider

Modify `amplify/backend/api/nextamplified/schema.graphql` to use Descope OIDC for authorization, as detailed in the [Amplify docs](https://docs.amplify.aws/nextjs/build-a-backend/graphqlapi/customize-authorization-rules/#using-oidc-authorization-provider).

> **Note:** `allow: private` will give access to your GraphQL backend as long as you provide a valid JWT (i.e. if you're logged in). If you want to install more granular user-based controls, you can read the Amplify docs above for more detailed options on how to develop your AppSync schema:

Example schema:

```graphql
type Todo
  @model
  @auth(
    rules: [
      { allow: private, provider: oidc }
    ]
  ) {
  content: String
}
```

You'll also need to ensure AWS compliant JWTs are used by configuring it in the Descope Console under [Project Settings](https://app.descope.com/settings/project).

<img width="600" alt="Monosnap Descope Console 2024-01-23 09-31-58" src="https://github.com/descope-sample-apps/descope-amplify-appsync/assets/32936811/38c58292-fa39-4a0a-bc13-37a9b26fcbeb">

### 5. Implement Client-side Login

Use the React SDK to create a login component. Authenticate client-side and pass the `sessionToken` to your GraphQL backend. If you're curious on how to integrate our React SDK with Next.js, you can look at the `src/app/page.tsx` and `/src/app/components/Login.tsx` pages in this sample app.

```javascript
import { generateClient } from 'aws-amplify/api';
import { getSessionToken } from '@descope/react-sdk';

const client = generateClient();

const fetchData = async () => {
  const sessionToken = getSessionToken();
  console.log(sessionToken);
  const todos = await client.graphql({ query: listTodos, authToken: sessionToken });
  console.log(todos);
  return todos;
};
```

## Issue Reporting ⚠️

For any issues or suggestions, feel free to open an issue in the GitHub repository.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
