import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  deleteProduct: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateProduct?: Maybe<Product>;
};


export type MutationCreateProductArgs = {
  count: Scalars['Float'];
  price: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdateProductArgs = {
  count: Scalars['Float'];
  id: Scalars['Int'];
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  count: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  availableProducts: Array<Product>;
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegularProductFragment = { __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string };

export type CreateProductMutationVariables = Exact<{
  count: Scalars['Float'];
  price: Scalars['Float'];
  title: Scalars['String'];
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string } };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['Int'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } | null } };

export type UpdateProductMutationVariables = Exact<{
  count: Scalars['Float'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updateProductId: Scalars['Int'];
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string } | null };

export type AvailableProductsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AvailableProductsQuery = { __typename?: 'Query', availableProducts: Array<{ __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, createdAt: string, updatedAt: string } | null };

export type ProductQueryVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string } | null };

export type ProductsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, title: string, price: number, count: number, createdAt: string, updatedAt: string }> };

export const RegularProductFragmentDoc = gql`
    fragment regularProduct on Product {
  id
  title
  price
  count
  createdAt
  updatedAt
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment regularUser on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const CreateProductDocument = gql`
    mutation CreateProduct($count: Float!, $price: Float!, $title: String!) {
  createProduct(count: $count, price: $price, title: $title) {
    ...regularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useCreateProductMutation() {
  return Urql.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: Int!) {
  deleteProduct(id: $deleteProductId)
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    errors {
      field
      message
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...regularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($count: Float!, $price: Float!, $title: String!, $updateProductId: Int!) {
  updateProduct(count: $count, price: $price, title: $title, id: $updateProductId) {
    ...regularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const AvailableProductsDocument = gql`
    query AvailableProducts($id: Int!) {
  availableProducts {
    ...regularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useAvailableProductsQuery(options: Omit<Urql.UseQueryArgs<AvailableProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<AvailableProductsQuery>({ query: AvailableProductsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...regularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductDocument = gql`
    query Product($productId: Int!) {
  product(id: $productId) {
    ...regularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products($id: Int!) {
  products {
    ...regularProduct
  }
}
    ${RegularProductFragmentDoc}`;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};