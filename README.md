# Next-Amplify Sample App with Descope Integration

This project demonstrates how to integrate Descope with a Next.js application using AWS Amplify and GraphQL. It showcases the use of Descope as an OpenID Connect (OIDC) provider for robust authorization controls to your GraphQL backend.

## Getting Started

To get started, you'll need to set up your own instance of this app. This particular app will not work, given that this was auto-created with `amplify init` and is tied to a sandbox AWS environment. This app gives you example code to look at for implementation of Descope in your own applications. Follow these steps to create a similar app for yourself, tied to your own AWS instance:

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

## Conclusion

By following these steps, you will have a functional Next-Amplify application using Descope for authentication and authorization. This setup allows you to leverage the power of AWS Amplify and GraphQL with the security and flexibility of Descope's authentication services.