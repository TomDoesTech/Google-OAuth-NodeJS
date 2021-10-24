import type { GetServerSideProps, NextPage } from "next";
import { AppContext } from "next/app";
import useSwr from "swr";
import { useSWRHandler } from "swr/dist/use-swr";
import styles from "../styles/Home.module.css";
import fetcher from "../utils/fetcher";
import getGoogleOAuthURL from "../utils/getGoogleUrl";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const { data } = useSwr<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  if (data) {
    return <div>Welcome! {data.name}</div>;
  }

  return (
    <div className={styles.container}>
      <a href={getGoogleOAuthURL()}>Login with Google</a>
      Please login
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );

  return { props: { fallbackData: data } };
};

export default Home;
