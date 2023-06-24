import Head from "next/head";
import Header from "../components/header/Header";
import Nav from "../components/navBar/Nav";
import Results from "../components/Result/Results";
import requests from "../utils/requests";
import axios from "axios";

export default function Home({ results }) {
  console.log(results);
  return (
    <div>
      <Head>
        <title>Hulu Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;
  console.log(genre);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3${
        requests[genre]?.url || requests.fetchAnimation.url
      }`
    );

    const data = response.data;

    return {
      props: {
        results: data.results,
      },
    };
  } catch (error) {
    console.log("Error occurred during the request:", error);
  }

  return {
    props: {
      results: [],
    },
  };
}
