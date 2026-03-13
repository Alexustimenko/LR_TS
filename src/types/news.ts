export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content?: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface NewsResponse {
    status: string;
    totalResults?: number;
    articles: Article[];
}

export interface LoaderOptions {
    apiKey: string;
}

export interface RequestOptions {
    [key: string]: string;
}

export interface GetRespParams {
    endpoint: string;
    options?: RequestOptions;
}

export type ResponseCallback<T> = (data: T) => void;