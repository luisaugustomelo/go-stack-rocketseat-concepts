import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
// import mine from 'mine';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalpath = path.resolve(uploadConfig.tmpFolder, file);

        // const ContentType = mine.getType(originalpath);

        // if (!ContentType) {
        //     throw new Error('File not found');
        // }

        const fileContent = await fs.promises.readFile(originalpath);

        await this.client
            .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                // ContentType,
            })
            .promise();

        await fs.promises.unlink(originalpath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: file,
            })
            .promise();
    }
}

export default S3StorageProvider;
