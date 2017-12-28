import React from 'react';
import NextHead from 'next/head';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Layout = props => (
	<div>
		<NextHead>
			<meta charSet="UTF-8" />
			<title>{props.title || 'CosmicJs Tour Diary App'}</title>
			<meta name="description" content="Created by Ali Hassan" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
			<link rel="apple-touch-icon" href="/static/touch-icon.png" />
			<link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
			<link rel="icon" href="/static/favicon.ico" />
			<meta property="og:url" content={props.url || defaultOGURL} />
			<meta property="og:title" content={props.title || ''} />
			<meta property="og:description" content={props.description || defaultDescription} />
			<meta name="twitter:site" content={props.url || defaultOGURL} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={props.ogImage || defaultOGImage} />
			<meta property="og:image" content={props.ogImage || defaultOGImage} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />

			<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
			<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/2.9.3/antd.min.css" />
		</NextHead>
		<style jsx global>{`
			body {
			}
		`}</style>
		{props.children}
	</div>
);

export default Layout;
