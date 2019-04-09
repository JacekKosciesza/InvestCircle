import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { resolvers } from './graphql.resolvers';

const uri = environment.features.gateway.endpoint;
const cache = new InMemoryCache();
cache.writeData({
  data: {
    user: '',
  },
});
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache,
    resolvers,
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
