"""DynamoDB service."""

from __future__ import annotations

from typing import Any

from services.aws_client import create_boto3_client


class DynamoDBService:
    """DynamoDB helper service."""

    def __init__(
        self,
        client: Any | None = None,
        table_name: str = "darzidesk-settings",
    ) -> None:
        self.client = client or create_boto3_client("dynamodb")
        self.table_name = table_name

    # ==========================================================
    # Generic Helpers
    # ==========================================================

    def _put(self, table_name: str, item: dict):
        return self.client.put_item(
            TableName=table_name,
            Item=item,
        )
    def _scan(self, table_name: str):
        response = self.client.scan(
            TableName=table_name,
        )
        return response.get("Items", [])

    def _get(self, table_name: str, key_name: str, key_value: str):
        response = self.client.get_item(
            TableName=table_name,
            Key={
                key_name: {
                    "S": key_value,
                }
            },
        )
        return response.get("Item")

    def _delete(self, table_name: str, key_name: str, key_value: str):
        return self.client.delete_item(
            TableName=table_name,
            Key={
                key_name: {
                    "S": key_value,
                }
            },
        )

    # ==========================================================
    # Orders
    # ==========================================================

    def put_order(self, item):
        return self._put("Orders", item)

    def get_orders(self):
        return self._scan("Orders")

    def get_order(self, order_id):
        return self._get("Orders", "orderId", order_id)

    def update_order(
        self,
        order_id,
        customer_name,
        phone,
        garment_type,
        status,
        delivery_date,
        assigned_tailor,
        advance,
        remaining,
        total_amount,
    ):
        return self.client.update_item(
            TableName="Orders",
            Key={
                "orderId": {
                    "S": order_id,
                }
            },
            UpdateExpression="""
                SET customerName=:customerName,
                    phone=:phone,
                    garmentType=:garmentType,
                    deliveryDate=:deliveryDate,
                    assignedTailor=:assignedTailor,
                    advance=:advance,
                    remaining=:remaining,
                    totalAmount=:totalAmount,
                    #status=:status
            """,
            ExpressionAttributeNames={
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":customerName": {"S": customer_name},
                ":phone": {"S": phone},
                ":garmentType": {"S": garment_type},
                ":deliveryDate": {"S": delivery_date},
                ":assignedTailor": {"S": assigned_tailor},
                ":advance": {"N": str(advance)},
                ":remaining": {"N": str(remaining)},
                ":totalAmount": {"N": str(total_amount)},
                ":status": {"S": status},
            },
        )

    def delete_order(self, order_id):
        return self._delete("Orders", "orderId", order_id)

    # ==========================================================
    # Customers
    # ==========================================================

    def put_customer(self, item):
        return self._put("Customers", item)

    def get_customers(self):
        return self._scan("Customers")

    def get_customer(self, customer_id):
        return self._get("Customers", "customerId", customer_id)

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
                "customerId": {
                    "S": customer_id,
                }
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
        return self._delete("Customers", "customerId", customer_id)
    # ==========================================================
    # Measurements
    # ==========================================================

    def put_measurement(self, item):
        return self._put("Measurements", item)

    def get_measurements(self):
        return self._scan("Measurements")

    def get_measurement(self, measurement_id):
        return self._get("Measurements", "measurementId", measurement_id)

    def update_measurement(self, measurement_id, values):
        expression = []
        attribute_values = {}

        for key, value in values.items():
            expression.append(f"{key}=:{key}")

            if isinstance(value, (int, float)):
                attribute_values[f":{key}"] = {
                    "N": str(value),
                }
            else:
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
        return self._delete(
            "Measurements",
            "measurementId",
            measurement_id,
        )

    # ==========================================================
    # Inventory
    # ==========================================================

    def put_inventory(self, item):
        return self._put("Inventory", item)

    def get_inventory(self):
        return self._scan("Inventory")

    def get_inventory_item(self, inventory_id):
        return self._get(
            "Inventory",
            "inventoryId",
            inventory_id,
        )

    def update_inventory(
        self,
        inventory_id,
        fabric_name,
        category,
        unit,
        quantity,
        cost_price,
        selling_price,
        supplier,
        status,
    ):
        return self.client.update_item(
            TableName="Inventory",
            Key={
                "inventoryId": {
                    "S": inventory_id,
                }
            },
            UpdateExpression="""
                SET fabricName=:fabricName,
                    category=:category,
                    #unit=:unit,
                    quantity=:quantity,
                    costPrice=:costPrice,
                    sellingPrice=:sellingPrice,
                    supplier=:supplier,
                    #status=:status
            """,
            ExpressionAttributeNames={
                "#unit": "unit",
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":fabricName": {"S": str(fabric_name)},
                ":category": {"S": str(category)},
                ":unit": {"S": str(unit)},
                ":quantity": {"N": str(quantity)},
                ":costPrice": {"N": str(cost_price)},
                ":sellingPrice": {"N": str(selling_price)},
                ":supplier": {"S": str(supplier)},
                ":status": {"S": str(status)},
            },
        )

    def delete_inventory(self, inventory_id):
        return self._delete(
            "Inventory",
            "inventoryId",
            inventory_id,
        )
    # ==========================================================
    # Employees
    # ==========================================================

    def put_employee(self, item):
        return self._put("Employees", item)

    def get_employees(self):
        return self._scan("Employees")

    def get_employee(self, employee_id):
        return self._get(
            "Employees",
            "employeeId",
            employee_id,
        )

    def update_employee(
        self,
        employee_id,
        employee_name,
        phone,
        role,
        salary,
        status,
    ):
        return self.client.update_item(
            TableName="Employees",
            Key={
                "employeeId": {
                    "S": employee_id,
                }
            },
            UpdateExpression="""
                SET employeeName=:employeeName,
                    phone=:phone,
                    #role=:role,
                    salary=:salary,
                    #status=:status
            """,
            ExpressionAttributeNames={
                "#role": "role",
                "#status": "status",
            },
            ExpressionAttributeValues={
                ":employeeName": {"S": str(employee_name)},
                ":phone": {"S": str(phone)},
                ":role": {"S": str(role)},
                ":salary": {"N": str(salary)},
                ":status": {"S": str(status)},
            },
        )

    def delete_employee(self, employee_id):
        return self._delete(
            "Employees",
            "employeeId",
            employee_id,
        )

    # ==========================================================
    # Invoices
    # ==========================================================

    def put_invoice(self, item):
        return self._put("Invoices", item)

    def get_invoices(self):
        return self._scan("Invoices")

    def get_invoice(self, invoice_id):
        return self._get(
            "Invoices",
            "invoiceId",
            invoice_id,
        )

    def update_invoice(
        self,
        invoice_id,
        order_id,
        customer_name,
        total_amount,
        advance_paid,
        remaining_amount,
        payment_status,
    ):
        return self.client.update_item(
            TableName="Invoices",
            Key={
                "invoiceId": {
                    "S": invoice_id,
                }
            },
            UpdateExpression="""
                SET orderId=:orderId,
                    customerName=:customerName,
                    totalAmount=:totalAmount,
                    advancePaid=:advancePaid,
                    remainingAmount=:remainingAmount,
                    paymentStatus=:paymentStatus
            """,
            ExpressionAttributeValues={
                ":orderId": {"S": str(order_id)},
                ":customerName": {"S": str(customer_name)},
                ":totalAmount": {"N": str(total_amount)},
                ":advancePaid": {"N": str(advance_paid)},
                ":remainingAmount": {"N": str(remaining_amount)},
                ":paymentStatus": {"S": str(payment_status)},
            },
        )

    def delete_invoice(self, invoice_id):
        return self._delete(
            "Invoices",
            "invoiceId",
            invoice_id,
        )
    def get_settings(self) -> dict[str, Any] | None:
         response = self.client.get_item(
            TableName=self.table_name,
            Key={
                "settingId": {
                    "S": "SHOP",
                },
            },
        )

         return response.get("Item")

    def update_settings(
        self,
        shop_name: str,
        owner_name: str,
        phone: str,
        email: str,
        address: str,
        logo_url: str,
    ) -> Any:

        return self.client.update_item(
            TableName=self.table_name,
            Key={
                "settingId": {
                    "S": "SHOP",
                },
            },
            UpdateExpression="""
                SET
                shopName = :shopName,
                ownerName = :ownerName,
                phone = :phone,
                email = :email,
                address = :address,
                logoUrl = :logoUrl
            """,
            ExpressionAttributeValues={
                ":shopName": {
                    "S": shop_name,
                },
                ":ownerName": {
                    "S": owner_name,
                },
                ":phone": {
                    "S": phone,
                },
                ":email": {
                    "S": email,
                },
                ":address": {
                    "S": address,
                },
                ":logoUrl": {
                    "S": logo_url,
                },
            },
        )
    def update_logo(
    self,
    logo_url: str,
) -> Any:

     return self.client.update_item(
        TableName=self.table_name,
        Key={
            "settingId": {
                "S": "SHOP",
            },
        },
        UpdateExpression="""
            SET logoUrl = :logoUrl
        """,
        ExpressionAttributeValues={
            ":logoUrl": {
                "S": logo_url,
            },
        },
    )     
          
        