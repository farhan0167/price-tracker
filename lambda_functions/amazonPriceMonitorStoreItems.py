import json
from bs4 import BeautifulSoup 
from scrapingbee import ScrapingBeeClient
import boto3
import uuid
from decimal import Decimal
import ast

def lambda_handler(event, context):
    # TODO implement
    client = ScrapingBeeClient(api_key='some_key')
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('table')
    
    print(event)
    for record in event['Records']:
        
        
        message = json.loads( json.loads(record['Sns']['Message']) )
        # ... your message processing logic here ...

        #get body of request to extract url:
        url = message['url']
        username = message['username']
        custom_name = message['custom_name']
        target = message["target"]
        
        
        response = client.get(url,
            params = { 
                 'wait_for': '.priceToPay',
                 'render_js': 'False'
            }
        )
        
        html = response.content
        #print(html)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Find title:
        target_class = "productTitle"
        title = soup.find(id=target_class)
        
        # Find price
        target_class = "priceToPay"
        priceTag = soup.find(class_=target_class)
        price_html = priceTag.find(class_='a-offscreen')
        #convert price to decimal
        price_raw = price_html.text
        price_r_arr = price_raw.split("$")
        price = json.loads(json.dumps(float(price_r_arr[1])), parse_float=Decimal)
        
        
        
        #generate random uuid for db key
        random_uuid = uuid.uuid4()
        
        data_forDB = {
            "uuid": str(random_uuid),
            "username": username,
            "price": price,
            "priceCh": [price],
            "product": title.text.strip(),
            "url": url,
            "custom_name": custom_name,
            "net_change": 0,
            "change_since_yesterday": 0,
            "target": Decimal(target)
        }
        
        try:
            
            table.put_item( Item=data_forDB )
            
        except:
            
            return {
                'statusCode': 501
            }

        
    return {
        'statusCode': 200,
        'body': 'Message processed successfully'
    }
