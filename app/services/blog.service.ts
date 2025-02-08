import { IBlog } from '@/types/blog';
import { gql, request } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRPAH_ENDPOINT as string;

export const BlogService = {
    async getAllBlogs() {
        const query = gql`
            query GetAllBlogs {
            blogs {
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
                }
            }
            }
        `;
        const data = await request<{blogs:IBlog[]}>(graphqlAPI, query);
        return data.blogs;
    }
};