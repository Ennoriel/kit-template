import { S3, type PutObjectCommandInput, type S3ClientConfig } from '@aws-sdk/client-s3';
import { validateToken } from '../db/csrf';
import {
	S3_BUCKET_API_KEY,
	S3_BUCKET_API_SECRET,
	S3_BUCKET_API_ENDPOINT
} from '$env/static/private';
import { getByteArray, isImage } from 'chyme';

export async function uploadS3(request: Request, filename: string) {
	const data = await request.formData();
	const file = data.get('file') as File;
	const csrf = data.get('csrf') as string;

	console.log('========');
	console.log('upload file', file.name, file.size, file.type);
	console.log('========');

	if (!file) {
		return Promise.reject('Le fichier est obligatoire.');
	}

	if (file.size > 1024 * 1024) {
		return Promise.reject('La taille du fichier ne doit pas dépasser 1 Mo.');
	}

	if (!isImage(file)) {
		return Promise.reject("Le fichier n'est pas une image");
	}

	if (!(await validateToken(csrf))) {
		return Promise.reject(
			"La demande n'a pu aboutir. Merci de rafraichir votre navigateur et de rééssayer."
		);
	}

	const config: S3ClientConfig = {
		endpoint: S3_BUCKET_API_ENDPOINT,
		credentials: {
			accessKeyId: S3_BUCKET_API_KEY,
			secretAccessKey: S3_BUCKET_API_SECRET
		},
		region: 'fr-par'
	};

	const client = new S3(config);

	const put: PutObjectCommandInput = {
		Bucket: 'website-rennes-sports',
		Key: filename,
		Body: await getByteArray(file),
		ACL: 'public-read',
		ContentType: 'image/png'
	};

	return new Promise((resolve, reject) => {
		client.putObject(put, (e) => {
			if (e) {
				reject(e);
			} else {
				resolve({ filename });
			}
		});
	});
}
