import ApolloClient from "apollo-boost";

export const createClient = (accessToken) => {
  return new ApolloClient({
    uri: `https://skin-care-quiz.myshopify.com/admin/api/2019-10/graphql.json`,
    request: (operation) => {
      operation.setContext({
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "User-Agent": `shopify-app-node ${process.env.npm_package_version} | Shopify App CLI`,
        },
      });
    },
  });
};
