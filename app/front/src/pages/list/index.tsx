import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';

const List = ({
  posts
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>{JSON.stringify(posts, null, 2)}</div>;
};

export const getServerSideProps = async () => {
  const f = await fetch('http://localhost:9090/employees');
  const r: { title: string }[] = await f.json();
  return {
    props: {
      posts: r
    }
  };
};

export default List;
