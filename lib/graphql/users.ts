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
