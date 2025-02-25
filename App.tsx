import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const uri =
  Platform.OS === "android"
    ? "http://10.0.2.2:4000/graphql"
    : "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <StatusBar style="light" />
          <HomeScreen />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
