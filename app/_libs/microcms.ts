import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

const hasEnvVars =
  process.env.MICROCMS_SERVICE_DOMAIN && process.env.MICROCMS_API_KEY;

const client = hasEnvVars
  ? createClient({
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
      apiKey: process.env.MICROCMS_API_KEY!,
    })
  : null;

export const getMembersList = async (
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Member>> => {
  if (!client) {
    return { contents: [], totalCount: 0, offset: 0, limit: 0 };
  }
  const listData = await client.getList<Member>({
    endpoint: "members",
    queries,
  });
  return listData;
};

export const getNewsList = async (
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<News>> => {
  if (!client) {
    return { contents: [], totalCount: 0, offset: 0, limit: 0 };
  }
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
): Promise<News | null> => {
  if (!client) {
    return null;
  }
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });

  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
): Promise<Category | null> => {
  if (!client) {
    return null;
  }
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });

  return detailData;
};

export const getAllNewsList = async (): Promise<News[]> => {
  if (!client) {
    return [];
  }
  const listData = await client.getAllContents<News>({
    endpoint: "news",
  });

  return listData;
};

export const getAllCategoryList = async (): Promise<Category[]> => {
  if (!client) {
    return [];
  }
  const listData = await client.getAllContents<Category>({
    endpoint: "categories",
  });

  return listData;
};
