import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers($input: PaginateUserInput!) {
    getUsers(input: $input) {
      docs {
        _id
        firstName
        lastName
        email
        username
        phone
        gender
        role
        status
        lastActiveAt
        createdAt
        updatedAt
      }
      totalDocs
      limit
      totalPages
      page
      pagingCounter
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($input: GetUserInput!) {
    getUser(input: $input) {
      _id
      firstName
      lastName
      email
      username
      phone
      gender
      role
      status
      lastActiveAt
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      _id
      firstName
      lastName
      email
      username
      phone
      gender
      role
      status
      lastActiveAt
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      firstName
      lastName
      email
      username
      phone
      gender
      role
      status
      lastActiveAt
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation SoftDeleteUser($input: SoftDeleteUserInput!) {
    softDeleteUser(input: $input) {
      _id
      firstName
      lastName
      email
      username
      phone
      gender
      role
      status
      lastActiveAt
      createdAt
      updatedAt
    }
  }
`;
