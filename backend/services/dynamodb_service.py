"""DynamoDB service."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class DynamoDBService:
    """DynamoDB helper service."""

    def __init__(
        self,
        client: Any | None = None,
        table_name: str = "",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    # ----------------------------
    # Orders
    # ----------------------------

    def put_order(self, item):
        return self.client.put_item(
            TableName="Orders",
            Item=item,
        )

    def get_orders(self):
        response = self.client.scan(
            TableName="Orders",
        )
        return response.get("Items", [])

    def get_order(self, order_id):
        response = self.client.get_item(
            TableName="Orders",
            Key={
                "orderId": {"S": order_id},
            },
        )
        return response.get("Item")

    def update_order(
        self,
        order_id,
        customer_name,
        phone,
        garment_type,
        status,
    ):
        return self.client.update_item(
            TableName="Orders",
            Key={
                "orderId": {"S": order_id},
            },
            UpdateExpression="""
                SET customerName=:customerName,
                    phone=:phone,
                    garmentType=:garmentType,
                    #status=:status
            """,
            ExpressionAttributeNames={
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":customerName": {"S": customer_name},
                ":phone": {"S": phone},
                ":garmentType": {"S": garment_type},
                ":status": {"S": status},
            },
        )

    def delete_order(self, order_id):
        return self.client.delete_item(
            TableName="Orders",
            Key={
                "orderId": {"S": order_id},
            },
        )

    # ----------------------------
    # Customers
    # ----------------------------

    def put_customer(self, item):
        return self.client.put_item(
            TableName="Customers",
            Item=item,
        )

    def get_customers(self):
        response = self.client.scan(
            TableName="Customers",
        )
        return response.get("Items", [])

    def get_customer(self, customer_id):
        response = self.client.get_item(
            TableName="Customers",
            Key={
                "customerId": {"S": customer_id},
            },
        )
        return response.get("Item")

    def update_customer(
        self,
        customer_id,
        customer_name,
        phone,
        email,
        address,
    ):
        return self.client.update_item(
            TableName="Customers",
            Key={
                "customerId": {"S": customer_id},
            },
            UpdateExpression="""
                SET customerName=:customerName,
                    phone=:phone,
                    email=:email,
                    address=:address
            """,
            ExpressionAttributeValues={
                ":customerName": {"S": customer_name},
                ":phone": {"S": phone},
                ":email": {"S": email},
                ":address": {"S": address},
            },
        )

    def delete_customer(self, customer_id):
        return self.client.delete_item(
            TableName="Customers",
            Key={
                "customerId": {"S": customer_id},
            },
        )

    # ----------------------------
    # Measurements
    # ----------------------------

    def put_measurement(self, item):
        return self.client.put_item(
            TableName="Measurements",
            Item=item,
        )

    def get_measurements(self):
        response = self.client.scan(
            TableName="Measurements",
        )
        return response.get("Items", [])

    def get_measurement(self, measurement_id):
        response = self.client.get_item(
            TableName="Measurements",
            Key={
                "measurementId": {"S": measurement_id},
            },
        )
        return response.get("Item")

    def update_measurement(self, measurement_id, values):
        expression = []
        attribute_values = {}

        for key, value in values.items():
            expression.append(f"{key}=:{key}")

            attribute_values[f":{key}"] = {
                "S": str(value),
            }

        return self.client.update_item(
            TableName="Measurements",
            Key={
                "measurementId": {
                    "S": measurement_id,
                }
            },
            UpdateExpression="SET " + ", ".join(expression),
            ExpressionAttributeValues=attribute_values,
        )

    def delete_measurement(self, measurement_id):
        return self.client.delete_item(
            TableName="Measurements",
            Key={
                "measurementId": {
                    "S": measurement_id,
                }
            },
        )

    # ----------------------------
    # Inventory
    # ----------------------------

    def put_inventory(self, item):
        return self.client.put_item(
            TableName="Inventory",
            Item=item,
        )

    def get_inventory(self):
        response = self.client.scan(
            TableName="Inventory",
        )
        return response.get("Items", [])