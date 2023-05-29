import json
from bs4 import BeautifulSoup 
from scrapingbee import ScrapingBeeClient
import boto3
import uuid
from decimal import Decimal

def lambda_handler(event, context):
    # TODO implement
    client = ScrapingBeeClient(api_key='some_key')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('table_name')
    
    response = table.scan()
    items = response['Items']
    
    for item in items:
        url = item['url']
        key = item['uuid']
        response = client.get(url,
            params = { 
                 'wait_for': '.priceToPay',
                 'render_js': 'False'
            }
        )
        html = response.content
        #print(html)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Find price
        target_class = "priceToPay"
        priceTag = soup.find(class_=target_class)
        price_html = priceTag.find(class_='a-offscreen')
        #convert price to decimal
        price_raw = price_html.text
        price_r_arr = price_raw.split("$")
        price = json.loads(json.dumps(float(price_r_arr[1])), parse_float=Decimal)
        
        if 'priceCh' in item.keys():
            # Define the update expression and attribute values for the update operation
            update_expression = 'SET #attrName = list_append(#attrName, :attrValue)'
            expression_attribute_names = {'#attrName': 'priceCh'}
            expression_attribute_values = {':attrValue': [price]}
            table.update_item(
            Key={
                'uuid': key
            },
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values
            )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
    
