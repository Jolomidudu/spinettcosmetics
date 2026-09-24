import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = (data.orders || []).map((order: any) => ({
          ...order,
          orderId: order.orderId || order.id,
          createdAt: order.createdAt || order.created_at,
          orderTitle: order.orderTitle || order.title,
          title: order.title || order.orderTitle || "Order",
        }));

        setOrders(normalized);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setOrders([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[770px]">
          {orders.length > 0 && (
            <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex ">
              <div className="min-w-[111px]">
                <p className="text-custom-sm text-dark">Order</p>
              </div>
              <div className="min-w-[175px]">
                <p className="text-custom-sm text-dark">Date</p>
              </div>

              <div className="min-w-[128px]">
                <p className="text-custom-sm text-dark">Status</p>
              </div>

              <div className="min-w-[213px]">
                <p className="text-custom-sm text-dark">Title</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Total</p>
              </div>

              <div className="min-w-[113px]">
                <p className="text-custom-sm text-dark">Action</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">Loading orders...</p>
          ) : orders.length > 0 ? (
            orders.map((orderItem, key) => (
              <SingleOrder key={key} orderItem={orderItem} smallView={false} />
            ))
          ) : (
            <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
              You don&apos;t have any orders!
            </p>
          )}
        </div>

        {!isLoading && orders.length > 0 &&
          orders.map((orderItem, key) => (
            <SingleOrder key={key} orderItem={orderItem} smallView={true} />
          ))}
      </div>
    </>
  );
};

export default Orders;
