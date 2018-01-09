import React from 'react';
import NextHead from 'next/head';
import reactDraftWysiwygCss from 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

const Wrapper = props => (
	<div style={{ minHeight: '100%' }}>
		<NextHead>
			<meta charSet="UTF-8" />
			<title>{props.title || 'CosmicJs Tour Diary App'}</title>
			<meta name="description" content="Created by Ali Hassan" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" sizes="192x192" href="/static/favicon.png" />
			<link rel="apple-touch-icon" href="/static/favicon.png" />
			<link rel="mask-icon" href="/static/favicon.png" color="#49B882" />
			<link rel="icon" href="/static/favicon.png" />
			<meta property="og:url" content={props.url || defaultOGURL} />
			<meta property="og:title" content={props.title || ''} />
			<meta property="og:description" content={props.description || defaultDescription} />
			<meta name="twitter:site" content={props.url || defaultOGURL} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:image" content={props.ogImage || defaultOGImage} />
			<meta property="og:image" content={props.ogImage || defaultOGImage} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
		</NextHead>

		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.1.0/antd.min.css" />
		<style jsx global>
			{reactDraftWysiwygCss}
		</style>

		<style jsx global>
			{`
				html {
					height: 100%;
				}
				body {
					height: 100%;
					background: darkseagreen !important;
					position: relative;
					padding-bottom: 6rem;
					min-height: 100%;
				}
				.ant-layout,
				.layout {
					background: darkseagreen !important;
					padding: 0px 50px;
				}
				.ant-card-meta-description {
					display: block;
					display: -webkit-box;
					height: 60px;
					margin: 0 auto;
					line-height: 1.4;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				a {
					color: black !important;
				}

				.anticon-delete:hover {
					color: red !important;
				}

				.anticon-form:hover {
					color: #1890ff !important;
				}
				footer {
					text-align: center;
					background: rgb(112, 169, 112);
					position: absolute;
					width: 100%;
					height: 35px;
					bottom: 0;
					padding-top: 5px;
				}

				.main-row-stl {
					margin-bottom: 40px;
					padding-top: 50px;
				}

				.rdw-editor-main {
					min-height: 100px;
					height: 100%;
					overflow: auto;
					box-sizing: border-box;
					border: 1px solid #f1f1f1 !important;
					padding: 5px !important;
					border-radius: 2px !important;
				}

				.adding-content-header {
					text-align: center;
					font-size: 30px;
					color: white;
					padding-top: 15%;
				}

				.anticon-delete:hover,
				.anticon-edit:hover,
				.anticon-form:hover {
					cursor: pointer;
				}

				.icon-pad {
					padding-right: 20px;
				}
				.ant-spin-container {
					overflow: visible !important;
				}
				.ant-spin-lg .ant-spin-dot {
					width: 80px !important;
					height: 80px !important;
				}
				.ant-spin-lg .ant-spin-dot i {
					width: 30px !important;
					height: 30px !important;
				}

				.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
					position: fixed !important;
					top: 40% !important;
				}
				.ant-spin-blur {
					opacity: 0.2 !important;
				}
				.ant-spin-blur:after {
					content: none !important;
				}

				.timeline-img {
					width: 300px;
					object-fit: fill;
					height: 230px;
				}

				.timeline ul li {
					list-style-type: none;
					position: relative;
					width: 6px;
					margin: -20px auto;
					padding-top: 50px;
					background: #fff;
				}

				.timeline ul li::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 30px;
					height: 30px;
					border-radius: 50%;
					background: inherit;
				}
				.timeline ul li div {
					position: relative;
					bottom: 0;
				}
				.timeline ul li div::before {
					content: '';
					position: absolute;
					bottom: 7px;
					width: 0;
					height: 0;
					border-style: solid;
				}
				.timeline ul li:nth-child(odd) div {
					left: 45px;
				}

				.timeline ul li:nth-child(odd) div::before {
					left: -15px;
					border-width: 8px 16px 8px 0;
					border-color: transparent #fff transparent transparent;
				}
				.timeline ul li:nth-child(even) div {
					left: -340px;
				}

				.timeline ul li:nth-child(even) div::before {
					right: -15px;
					border-width: 8px 0 8px 16px;
					border-color: transparent transparent transparent #fff;
				}

				@media screen and (max-width: 900px) {
					.timeline ul li div {
						width: 250px;
					}
					.timeline ul li:nth-child(even) div {
						left: -335px;
					}
				}
				@media screen and (max-width: 600px) {
					.timeline ul li {
						margin-left: 20px;
					}

					.timeline ul li div {
						width: calc(100vw - 91px);
					}

					.timeline ul li:nth-child(even) div {
						left: 45px;
					}

					.timeline ul li:nth-child(even) div::before {
						left: -15px;
						border-width: 8px 16px 8px 0;
						border-color: transparent #fff transparent transparent;
					}
				}
			`}
		</style>

		{props.children}

		<footer>
			Powered by{' '}
			<a href="https://cosmicjs.com/" rel="noopener noreferrer" target="_blank">
				Cosmic JS
			</a>
		</footer>
	</div>
);

export default Wrapper;
