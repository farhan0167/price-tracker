import json
import boto3

def lambda_handler(event, context):
    print(event)
    
    # TODO implement
    sns_client = boto3.client('sns')
    #publish to Dynamo Topic
    response = sns_client.publish(
        TopicArn='arn:aws:sns:us-east-1:sns-arn-topic',
        Message=json.dumps(event['body'])
    )
    
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:

        return {
            'statusCode': 200,
            'body': json.dumps('Message published successfully!')
        }
    else:

        return {
            'statusCode': 200,
            'body': json.dumps('Failed to publish message!')
        }
    
