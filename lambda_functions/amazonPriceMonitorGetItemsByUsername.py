import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    #get form data:
    #get body of request to extract url:
    formData_raw = event["body"]
    formData = json.loads(formData_raw)
    username = formData['username']
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('table_name')
    
    response = table.scan(
        FilterExpression=Attr('username').eq(username)
    )

    items = response['Items']
    for item in items:
        item['price'] = float(item['price']) #to be able parse in response
        #process decimal type to floats
        if 'priceCh' in item.keys():
            float_list = [float(d) for d in item['priceCh']]
            item['priceCh'] = float_list

    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
