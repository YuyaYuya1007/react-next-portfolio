import styles from "./page.module.css";
import Image from "next/image";

type Article = {
  id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
  publishedAt: string;
};

const data: {
  contents: Article[];
} = {
  contents: [
    {
      id: "1",
      title: "TuneCore Japanとは",
      description:
        "TuneCore Japanは、音楽アーティストが自分の作品を世界中の主要なストリーミングプラットフォームに配信できるサービスです。",
      category: {
        name: "サービス紹介",
      },
      publishedAt: "2024/01/01",
    },
    {
      id: "2",
      title: "簡単な配信プロセス",
      description:
        "直感的なアップロード機能により、数分で音楽を配信できます。Spotify、Apple Music、YouTube Musicなど対応。",
      category: {
        name: "機能",
      },
      publishedAt: "2024/01/02",
    },
    {
      id: "3",
      title: "アーティストのための分析ツール",
      description:
        "リアルタイムで再生数、売上、リスナー情報を確認できます。自分の音楽のパフォーマンスを詳しく分析できます。",
      category: {
        name: "機能",
      },
      publishedAt: "2024/01/03",
    },
  ],
};

export default function Home() {
  const sliceData = data.contents.slice(0, 2);
  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>TuneCore Japan</h1>
          <p className={styles.description}>
            あなたの音楽を世界に届けよう。独立系アーティストのための音楽配信プラットフォーム
          </p>
        </div>
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>特徴</h2>
        <ul>
          {sliceData.map((article) => (
            <li key={article.id} className={styles.list}>
              <div className={styles.link}>
                <Image
                  className={styles.image}
                  src="/no-image-png"
                  alt="No Image"
                  width={1200}
                  height={630}
                />
              </div>
              <dl className={styles.content}>
                <dt className={styles.newsItemTitle}>{article.title}</dt>
                <dd className={styles.description}>{article.description}</dd>
                <dd className={styles.meta}>
                  <span className={styles.tag}>{article.category.name}</span>
                  <span className={styles.date}>
                    <Image
                      src="/clock.svg"
                      alt=""
                      width={16}
                      height={16}
                      priority
                    />
                    {article.publishedAt}
                  </span>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
