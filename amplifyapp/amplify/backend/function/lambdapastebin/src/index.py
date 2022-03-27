import json
import uuid
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError

my_config = Config(
    region_name = 'eu-west-2',
    signature_version = 'v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

def put_text(id, text, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', config=my_config)

    table = dynamodb.Table('dynamodbpastebin')
    response = table.put_item(
       Item={
           'id': id,
            'text': text,
        }
    )
    return response

def get_text(id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', config=my_config)

    table = dynamodb.Table('dynamodbpastebin')

    try:
        response = table.get_item(Key={'id': id})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print('item:', response['Item'])
        return response['Item']


def handler(event, context):
    print('received event:')
    print(event)
    body = ''

    if 'httpMethod' in event:
        method = event['httpMethod']

        if method == 'GET':
            id = event['path'].split('/')[-1]
            print('id', id)
            body = get_text(id)
        elif method == 'POST' and 'body' in event and event['body'] != None:
            body = json.loads(event['body'])
            text = body['text']
            unique_id = str(uuid.uuid4())
            put_text(unique_id, text) 
            body = unique_id 

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)
    }