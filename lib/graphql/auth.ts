import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        _id
        firstName
        lastName
        email
        username
        role
        status
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      refreshToken
      user {
        _id
        firstName
        lastName
        email
        username
        role
        status
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
      user {
        _id
        firstName
        lastName
        email
        username
        role
        status
      }
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getUser(input: { _id: "current" }) {
      _id
      firstName
      lastName
      email
      username
      role
      status
    }
  }
`;
