"use client";

import { client } from "@/lib/apollo-client";
import { store } from "@/lib/store";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </Provider>
  );
}
