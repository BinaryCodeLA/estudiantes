import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

@Injectable()
export class Client {
   public dynamoDB: any
   public dynamoDBClient: any
    constructor(private config: ConfigService){   
        let awsconfig = {
          "region":this.config.get<string>('region'),
          "endpoint":this.config.get<string>('endpoint'),
          "accessKeyId":this.config.get<string>('accesskeyId'),
          "secretAccessKey":this.config.get<string>('secrretkeyId')
        }
        AWS.config.update(awsconfig)
         this.dynamoDBClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
        this.dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'})
    }
}
