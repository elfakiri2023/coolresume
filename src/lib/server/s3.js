import { R2_ACCESS_KEY, R2_ACCOUNT_ID, R2_SECRET_KEY } from '$env/static/private'
import { S3Client } from '@aws-sdk/client-s3'

const S3 = new S3Client({
	region: 'auto',
	endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: R2_ACCESS_KEY,
		secretAccessKey: R2_SECRET_KEY
	}
})

export { S3 }
