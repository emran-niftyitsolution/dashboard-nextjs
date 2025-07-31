"use client";

import { client } from "@/lib/apollo-client";
import { store } from "@/lib/store";
import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { Provider } from "react-redux";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Make Redux store available globally for Apollo client
    if (typeof window !== "undefined") {
      (window as { __REDUX_STORE__?: typeof store }).__REDUX_STORE__ = store;
    }
  }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}
