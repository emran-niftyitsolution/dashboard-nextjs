import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Function to update Redux store with new tokens
const updateReduxStore = (
  user: unknown,
  accessToken: string,
  refreshToken: string
) => {
  if (typeof window !== "undefined") {
    // Dispatch to Redux store if available
    const store = (
      window as { __REDUX_STORE__?: { dispatch: (action: unknown) => void } }
    ).__REDUX_STORE__;
    if (store) {
      store.dispatch({
        type: "auth/setCredentials",
        payload: { user, accessToken, refreshToken },
      });
    }
  }
};

// Function to refresh token
const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) {
      return false;
    }

    const response = await fetch("http://localhost:5001/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
              accessToken
              refreshToken
              user {
                _id
                firstName
                lastName
                email
                username
                role
                status
              }
            }
          }
        `,
        variables: {
          input: {
            refreshToken: refreshTokenValue,
          },
        },
      }),
    });

    const result = await response.json();

    if (result.data?.refreshToken) {
      const {
        accessToken,
        refreshToken: newRefreshToken,
        user,
      } = result.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Update Redux store
      updateReduxStore(user, accessToken, newRefreshToken);

      return true;
    }
    return false;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false;
  }
};

// Error link with token refresh logic
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message === "Unauthorized"
        ) {
          // Token is expired, try to refresh
          return new Observable((observer) => {
            refreshToken().then((success) => {
              if (success) {
                // Token refreshed successfully, retry the operation
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                });

                // Retry the operation
                const retryOperation = forward(operation);
                retryOperation.subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              } else {
                // Refresh failed, redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                // Update Redux store to clear auth state
                if (typeof window !== "undefined") {
                  const store = (
                    window as {
                      __REDUX_STORE__?: { dispatch: (action: unknown) => void };
                    }
                  ).__REDUX_STORE__;
                  if (store) {
                    store.dispatch({ type: "auth/logout" });
                  }
                }

                window.location.href = "/login";
                observer.error(err);
              }
            });
          });
        }
      }

      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});
