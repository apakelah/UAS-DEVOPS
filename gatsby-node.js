const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// CREATE PAGES
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              location
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              location
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("❌ Error while running GraphQL query.");
    return;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.templateKey)}.js`
      ),
      context: {
        id: node.id,
        next,
        previous,
      },
    });
  });
};

// CREATE SLUG FIELD
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

// SCHEMA CUSTOMIZATION
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      templateKey: String
      title: String
      date: Date @dateformat
      location: String
      office: Office
    }

    type Office {
      address: String
      phone: String
    }
  `;

  createTypes(typeDefs);
};