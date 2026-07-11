import boto3

from config.settings import AppConfig


# Shared AWS session placeholder for future service modules.
def get_boto3_session():
    return boto3.session.Session(region_name=AppConfig.AWS_REGION)
