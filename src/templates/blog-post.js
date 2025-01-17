import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Button from '../components/button';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
	render() {
		const post = this.props.data.mdx;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const { previous, next } = this.props.pageContext;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
				<h1>{post.frontmatter.title}</h1>
				<p
					style={{
						...scale(-1 / 5),
						display: `block`,
						marginBottom: rhythm(1),
						marginTop: rhythm(-1)
					}}
				>
					{post.frontmatter.date}
				</p>
				<MDXRenderer>{post.body}</MDXRenderer>
				<hr
					style={{
						marginBottom: rhythm(1)
					}}
				/>
				<Bio />

				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0
					}}
				>
					<li>
						{previous && (
							<Link to={`/blog${previous.fields.slug}`} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={`/blog${next.fields.slug}`} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
				<Link to="/blog/" style={{ fontFamily: 'montserrat' }}>
					<Button marginTop="35px">Lebih Banyak Doa</Button>
				</Link>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		mdx(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			body
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
	}
`;
