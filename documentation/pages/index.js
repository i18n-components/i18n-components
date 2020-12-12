import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";

const features = [
  {
    title: "Light Weight",
    imageUrl: "img/lightweigth.svg",
    description: (
      <>
        Light weight Javascript bundle.
      </>
    ),
  },
  {
    title: "Easy to Use",
    imageUrl: "img/easy_to_use.svg",
    description: (
      <>
        Simple APIs. Easy to use.
      </>
    ),
  },
  {
    title: "Platform Agnostic",
    imageUrl: "img/platform-agnostic.svg",
    description: (
      <>
        Developed using HTML 5 Web Components. Can be used acrooss frameworks.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3  className="text--center">{title}</h3>
      <p className="text--center">{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Locale flavoured Web Components | Format Input Number"
    >
      <div className={styles.hero}>
        <header className={styles.heroBanner}>
          <div className={styles['heroBanner-inside']}>
            <h1>{siteConfig.title}</h1>
            <p>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link to={useBaseUrl("docs/")}>Get Started</Link>
            </div>
            <PresentationAnimation/>
          </div>
        </header>
        <main>
          {features && features.length > 0 && (
            <section className={styles.section}>
              <div className={styles.features}>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </Layout>
  );
}

function PresentationAnimation() {
  return (
    <div className={styles['laptop-container']}>
      <img src="/img/bars.svg" />
    </div>
  )
}

export default Home;
