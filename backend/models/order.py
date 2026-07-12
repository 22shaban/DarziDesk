from dataclasses import dataclass, asdict


@dataclass
class Order:
    orderId: str
    customerName: str
    phone: str
    garmentType: str
    status: str
    orderDate: str
    deliveryDate: str
    totalAmount: float

    def to_dict(self):
        return asdict(self)