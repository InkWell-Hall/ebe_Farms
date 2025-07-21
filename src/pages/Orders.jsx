const Orders = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Recent Orders
      </h2>
      <div className="space-y-4">
        {[
          {
            id: "ORD-001",
            date: "2024-01-15",
            status: "Delivered",
            total: "₵125.00",
          },
          {
            id: "ORD-002",
            date: "2024-01-10",
            status: "Processing",
            total: "₵89.50",
          },
          {
            id: "ORD-003",
            date: "2024-01-05",
            status: "Shipped",
            total: "₵156.75",
          },
        ].map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{order.total}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Orders;
