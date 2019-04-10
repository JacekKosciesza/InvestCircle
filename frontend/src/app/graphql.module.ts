import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { resolvers } from './graphql.resolvers';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const uri = environment.features.gateway.endpoint;
const cache = new InMemoryCache();
cache.writeData({
  data: {
    user: '',
  },
});
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });

  const basic = setContext((operation, ctx) => ({
    headers: new HttpHeaders().set('x-api-key', ''),
  }));

  const token = sessionStorage.getItem(environment.tokenKey) || localStorage.getItem(environment.tokenKey);
  const auth = setContext((operation, ctx) => ({
    headers: ctx.headers.append('Authorization', `Bearer ${token}`),
  }));

  return {
    link: ApolloLink.from([basic, auth, http]),
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
