import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core";

const client = new ApolloClient({
	uri: "https://api.anemy.fr/v3/",
	cache: new InMemoryCache()
});

export interface UserQueryData {
	Me: Me;
}

export interface Me {
	id: number;
	username: string;
	avatar: string;
}

export async function getUser(token: string): Promise<UserQueryData | null> {
	try {
		const { data, error, errors } = await client.query<UserQueryData>({
			query: gql`
				query {
					Me {
						id
						username
						avatar
					}
				}
			`,
			context: {
				headers: {
					Authorization: `${token}`
				}
			}
		});
		if (error != null || errors != null) {
			return null;
		}

		return data;
	} catch {
		return null;
	}
}
