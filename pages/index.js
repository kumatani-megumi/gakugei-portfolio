import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { client } from "../libs/client";

export default function Home({ data }) {
  return (
    <div classNameName={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <h1 className={styles.headerTitle}>
            <Link href="/">
              <a>PORTFORIO</a>
            </Link>
          </h1>
          <ul className={styles.snsIcons}>
            <li className={styles.snsIcon_twitter}>
              <Link href="https://twitter.com/?lang=ja">
                <a>Twitter</a>
              </Link>
            </li>
            <li className={styles.snsIcon_instagram}>
              <Link href="https://www.instagram.com/">
                <a>Instagram</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.contentRow}>
          {data.map((blog, key) => (
            <Link href={`/blogs/${blog.id}`} key={key}>
              <a className={styles.card}>
                <Image
                  src={blog.eyecatch.url}
                  alt="作品の画像1"
                  width={896}
                  height={504}
                />
                <h2 className={styles.title}>{blog.title}</h2>
                <h3 className={styles.category}>{blog.category.name}</h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      offset: 0,
      limit: 1000,
    },
  });

  return {
    props: {
      data: data.contents,
    },
  };
};
