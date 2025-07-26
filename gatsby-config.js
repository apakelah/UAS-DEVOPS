require('events').EventEmitter.defaultMaxListeners = 20;

const siteUrl = process.env.URL || `https://smk-daarussaadah.sch.id/`;

module.exports = {
  siteMetadata: {
    title: "SMK Daarus Saadah",
    description: "Official Website SMK Daarussaadah Kota Tangerang",
    siteUrl: siteUrl,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout`),
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SMKDaarussaadah`,
        short_name: `SMKDaarussaadah`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#047857`,
        display: `standalone`,
        icon: `src/img/logo.png`,
      },
    },
    "gatsby-transformer-remark-frontmatter",
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        resolveSiteUrl: () => siteUrl,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};