import { IBlog, ICategory } from '@/types/blog';
import {gql,request} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogService = {
    async getBlogs() {
        const query = gql`
            query GetAllBlogs {
                blogs(last: 3) {
                    excerpt
                    createdAt
                    slug
                    title
                    image {
                    url
                    }
                    id
                    author {
                    name
                    avatar {
                        url
                    }
                    }
                    description {
                    html
                    }
                }
            }
        `; 
        const result = await request<{blogs:IBlog[]}>(graphqlAPI, query);
        return result.blogs;
    },

    async getLatestBlogs(){
        const query = gql`
        query getLast {
            blogs(last: 3) {
                excerpt
                createdAt
                slug
                title
                image {
                url
                }
                id
                author {
                name
                avatar {
                    url
                }
                }
            }
            }
        `;
        const result = await request<{blogs:IBlog[]}>(graphqlAPI, query);
        return result.blogs;
    },

    async getBlogDetails(slug:string){
        const query = gql`
        query getBlogDetails {
            blog(where: {slug: "${slug}"}) {
                author {
                avatar {
                    url
                }
                name
                }
                createdAt
                excerpt
                title
                description {
                html
                }
                category {
                label
                }
                image {
                url
                }
            }
            }
        `;
        const result = await request<{blog:IBlog}>(graphqlAPI, query,{slug});
        return result.blog;
    },
    async getCategories(){
        const query = gql`
        query GetCategories {
        categories {
            label
            slug
        }
        }
        `;
        const result = await request<{categories:ICategory[]}>(graphqlAPI, query);
        return result.categories
    }
}