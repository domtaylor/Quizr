import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import Cookies from "js-cookie";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
//Redux
import { Provider as ReduxProvider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import AppMenu from "../components/AppMenu";

function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: userLoggedInFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  state = {
    shopOrigin: Cookies.get("shopOrigin"),
    loaded: false,
  };
  render() {
    const { Component, pageProps, host, shop, reduxStore } = this.props;
    return (
      <AppProvider
        i18n={translations}
        shopOrigin={this.state.shopOrigin}
        forceRedirect
      >
        <Provider
          config={{
            apiKey: API_KEY,
            host: host,
            shop: shop,

            forceRedirect: true,
          }}
        >
          <ReduxProvider store={reduxStore}>
            <AppMenu>
              <MyProvider Component={Component} {...pageProps} />
            </AppMenu>
          </ReduxProvider>
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    host: ctx.query.host,
  };
};

export default withReduxStore(MyApp);
