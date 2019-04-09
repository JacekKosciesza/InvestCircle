export const resolvers = {
  Mutation: {
    setUser: (_, variables, { cache, getCacheKey }) => {
      cache.writeData({
        data: {
          user: variables.user,
        },
      });
      return null;
    },
  },
};
