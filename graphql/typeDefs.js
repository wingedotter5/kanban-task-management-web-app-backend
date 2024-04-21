module.exports = `
  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Board {
    id: ID!
    name: String!
    columns: [Column!]!
  }

  type Column {
    id: ID!
    name: String!
  }

  input ColumnInput {
    id: ID!
    name: String!
  }

  type Query {
    boards: [Board!]!
    board(id: ID!): Board
  }

  type Mutation {
    signup(
      username: String!
      password: String!
    ): AuthPayload!

    login(
      username: String!
      password: String!
    ): AuthPayload!

    createBoard(
      name: String!
      columns: [String!]
    ): Board!

    deleteBoard(id: ID!): Boolean!

    updateBoard(
      id: ID!
      name: String
      deletedColumnIds: [ID!]
      modifiedColumns: [ColumnInput!]
      newColumns: [String!]
    ): Board!
  }
`;
