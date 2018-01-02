import Cosmic from 'cosmicjs';
import config from './config';

export default function cosmic(type, params) {
	if (type === 'GET_TYPE') {
		return new Promise((resolve, reject) => {
			Cosmic.getObjectType(config, params, (err, res) => {
				console.log(res);
				if (!err) {
					resolve(res.objects.all);
				} else {
					reject(err);
				}
			});
		});
	} else if (type === 'ADD') {
		return new Promise((resolve, reject) => {
			Cosmic.addObject(config, params, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	} else if (type === 'EDIT') {
		return new Promise((resolve, reject) => {
			Cosmic.editObject(config, params, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	} else if (type === 'DELETE') {
		return new Promise((resolve, reject) => {
			Cosmic.deleteObject(config, params, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	} else if (type === 'ADD_MEDIA') {
		return new Promise((resolve, reject) => {
			Cosmic.addMedia(config, params, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	} else if (type === 'DELETE_MEDIA') {
		return new Promise((resolve, reject) => {
			Cosmic.deleteMedia(config, params, (err, res) => {
				if (!err) {
					resolve(res);
				} else {
					reject(err);
				}
			});
		});
	}
}
