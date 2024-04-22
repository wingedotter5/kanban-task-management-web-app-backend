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

    tasks: [Task!]!
  }

  input ColumnInput {
    id: ID!
    name: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    columnId: ID!

    subtasks: [Subtask!]!
  }

  type Subtask {
    id: ID!
    title: String!
    isCompleted: Boolean!
  }

  input SubtaskInput {
    id: ID!
    title: String
    isCompleted: Boolean
  }

  type Query {
    getBoards: [Board!]!
    getBoard(id: ID!): Board
  }

  type Mutation {
    signup(
      username: String!
      password: String!
    ): AuthPayload

    login(
      username: String!
      password: String!
    ): AuthPayload

    createBoard(
      name: String!
      columns: [String!]
    ): Board!

    deleteBoard(id: ID!): Boolean!

    editBoard(
      id: ID!
      name: String
      deletedColumnIds: [ID!]
      modifiedColumns: [ColumnInput!]
      newColumns: [String!]
    ): Board!

    createTask(
      title: String!
      description: String
      subtasks: [String!]
      columnId: ID!
    ): Task!

    deleteTask(
      id: ID!
    ): Boolean!

    editTask(
      id: ID!
      title: String
      description: String
      columnId: ID!
      deletedSubtaskIds: [ID!]
      modifiedSubtasks: [SubtaskInput!]
      newSubtasks: [String!]
    ): Task
  }
`;
