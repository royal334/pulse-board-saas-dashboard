"use client";

import React from "react";
import { MoreHorizontal, ChevronDown, Camera, Shirt, Droplet, SprayCan } from "lucide-react";

type Order = {
  trackingNo: string;
  productName: string;
  productBg: string;
  ProductIcon: React.ComponentType<{ size?: number; className?: string }>;
  price: string;
  totalOrder: number;
  totalAmount: string;
};

const orders: Order[] = [
  {
    trackingNo: "#876364",
    productName: "Camera Lens",
    productBg: "bg-pink-100",
    ProductIcon: Camera,
    price: "$178",
    totalOrder: 325,
    totalAmount: "1,46,660",
  },
  {
    trackingNo: "#987651",
    productName: "Black Sleep Dress",
    productBg: "bg-slate-100",
    ProductIcon: Shirt,
    price: "$230",
    totalOrder: 142,
    totalAmount: "32,660",
  },
  {
    trackingNo: "#453432",
    productName: "Argan Oil",
    productBg: "bg-amber-50",
    ProductIcon: Droplet,
    price: "$89",
    totalOrder: 89,
    totalAmount: "7,921",
  },
  {
    trackingNo: "#654321",
    productName: "EAU DE Parfum",
    productBg: "bg-amber-100",
    ProductIcon: SprayCan,
    price: "$156",
    totalOrder: 210,
    totalAmount: "32,760",
  },
];

function RecentOrders() {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex justify-between items-center p-5 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="More options"
        >
          <MoreHorizontal size={22} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-5 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-1">
                  Tracking no
                  <ChevronDown size={14} className="text-slate-400" />
                </span>
              </th>
              <th className="text-left py-3 px-5 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-1">
                  Product Name
                  <ChevronDown size={14} className="text-slate-400" />
                </span>
              </th>
              <th className="text-left py-3 px-5 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-1">
                  Price
                  <ChevronDown size={14} className="text-slate-400" />
                </span>
              </th>
              <th className="text-left py-3 px-5 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-1">
                  Total Order
                  <ChevronDown size={14} className="text-slate-400" />
                </span>
              </th>
              <th className="text-left py-3 px-5 text-sm font-medium text-slate-600">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const Icon = order.ProductIcon;
              return (
                <tr
                  key={order.trackingNo}
                  className="border-b border-slate-50 last:border-b-0"
                >
                  <td className="py-3.5 px-5 text-sm font-medium text-slate-800">
                    {order.trackingNo}
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${order.productBg}`}
                      >
                        <Icon size={20} className="text-slate-700" />
                      </div>
                      <span className="text-sm font-medium text-slate-800">
                        {order.productName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-sm font-medium text-slate-800">
                    {order.price}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-50">
                      {order.totalOrder}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-sm font-medium text-slate-800">
                    ${order.totalAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
