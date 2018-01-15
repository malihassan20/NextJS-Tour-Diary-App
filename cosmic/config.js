/* Configuration for CosmicJs bucket
================================ */
export default {
	bucket: {
		slug: process.env.COSMIC_BUCKET,
		read_key: process.env.COSMIC_READ_KEY,
		write_key: process.env.COSMIC_WRITE_KEY
	},
	image_folder: 'tour-images'
};
