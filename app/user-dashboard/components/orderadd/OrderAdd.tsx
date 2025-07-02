"use client";

import { useState } from "react";
import { useEffect } from "react";
import { Box } from "lucide-react";
import { OrderType } from "../../types";
import { mn } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

type OrderAddProps = {
  onCancel: () => void;
};

const factory = ["Apu", "MCS", "TavanBogd", "CU"];

const nameOptions: Record<string, string[]> = {
  Apu: ["CocaCola", "Sprite", "HiC"],
  MCS: ["Sprite", "TengeriinUs"],
  TavanBogd: ["HiC"],
  CU: ["TengeriinUs", "HiC", "Амттан"],
};

const typeOptions: Record<string, string[]> = {
  CocaCola: ["Гаазтай", "Хүйтэн"],
  Sprite: ["Гаазтай", "Цагаан"],
  HiC: ["Жүүс", "Амттай"],
  TengeriinUs: ["Ус", "Эрүүл мэндийн"],
  Амттан: ["Шоколад", "Чипс"],
};

export const OrderAdd = ({ onCancel }: OrderAddProps) => {
  const [todayDay, setTodayDay] = useState("");
  const [shopName, setShopName] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderName, setOrderName] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [orderFactory, setOrderFactory] = useState("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [deliveredDate, setDeliveredDate] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("");

  const getWeekday = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, "EEEE", { locale: mn });
  };

  useEffect(() => {
    const now = new Date();
    const date = format(now, "yyyy-MM-dd");
    const day = format(now, "EEEE", { locale: mn });

    setTodayDate(date);
    setTodayDay(day);
  }, []);

  console.log("zahialguud", orders);
  //  const handleAddOrder = async () => {
  //   if (
  //     orderFactory &&
  //     orderName &&
  //     orderType &&
  //     orderQuantity &&
  //     deliveredDate &&
  //     shopName
  //   ) {
  //     const orderDate = todayDate;
  //     const weekDay = getWeekday(orderDate);

  //     const newOrder: OrderType = {
  //       factory: orderFactory,
  //       product: orderName,
  //       productType: orderType,
  //       quantity: Number(orderQuantity),
  //       deliveredDate,
  //       shopName,
  //       orderDate,
  //       weekDay,
  //     };

  //     // Backend рүү илгээх mutation
  //     try {
  //       await createOrder({
  //         variables: {
  //           input: {
  //             factory: newOrder.factory,
  //             product: newOrder.product,
  //             productType: newOrder.productType,
  //             quantity: newOrder.quantity,
  //             deliveredDate: newOrder.deliveredDate,
  //             shopName: newOrder.shopName,
  //             orderDate: newOrder.orderDate,
  //             weekDay: newOrder.weekDay,
  //           },
  //         },
  //       });

  //       setOrders([...orders, newOrder]);

  //       setOrderFactory("");
  //       setOrderName("");
  //       setOrderType("");
  //       setOrderQuantity("");
  //       setDeliveredDate("");
  //       setShopName("");
  //     } catch (err) {
  //       console.error("Захиалга илгээхэд алдаа гарлаа:", err);
  //     }
  //   }
  // };

  const handleAddOrder = () => {
    if (
      orderFactory &&
      orderName &&
      orderType &&
      orderQuantity &&
      deliveredDate &&
      shopName
    ) {
      const orderDate = todayDate;
      const weekDay = getWeekday(orderDate);

      const newOrder: OrderType = {
        factory: orderFactory,
        product: orderName,
        productType: orderType,
        quantity: Number(orderQuantity),
        deliveredDate,
        shopName,
        orderDate,
        weekDay,
      };

      setOrders([...orders, newOrder]);

      setOrderFactory("");
      setOrderName("");
      setOrderType("");
      setOrderQuantity("");
      setDeliveredDate("");
      setShopName("");
    }
  };

  return (
    <div className="w-[460px] bg-white rounded-md text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="flex flex-col p-6 gap-y-6">
        <div className="flex gap-x-2.5 justify-center">
          <Box className="text-[#FE4B00]" />
          <p className="text-lg font-semibold">Захиалгаа оруулна уу</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Захиалга хийж байгаа гараг(Өөрчлөх боломжгүй)</p>
          <p className="text-sm font-medium">{todayDay}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Захиалга хийж байгаа огноо(Өөрчлөх боломжгүй)</p>
          <p className="text-sm font-medium">{todayDate}</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-normal">Дэлгүүрийн нэрээ оруулна уу</p>
          <Input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Дэлгүүрийн нэрээ оруулна уу"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-normal">Үйлдвэрээ сонгоно уу</p>
          <select
            className="border rounded px-3 py-2 text-black"
            value={orderFactory}
            onChange={(e) => {
              setOrderFactory(e.target.value);
              setOrderName("");
              setOrderType("");
            }}
          >
            <option value="">-- Үйлдвэр сонгох --</option>
            {factory.map((fac) => (
              <option key={fac} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>

        {orderFactory && (
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-normal">
              Бүтээгдэхүүний нэрээ сонгоно уу
            </p>
            <select
              className="border rounded px-3 py-2 text-black"
              value={orderName}
              onChange={(e) => {
                setOrderName(e.target.value);
                setOrderType("");
              }}
            >
              <option value="">-- Нэр сонгох --</option>
              {nameOptions[orderFactory].map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        {orderName && (
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-normal">
              Бүтээгдэхүүний төрлөө сонгоно уу
            </p>
            <select
              className="border rounded px-3 py-2 text-black"
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
            >
              <option value="">-- Төрөл сонгох --</option>
              {typeOptions[orderName].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {orderType && (
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-normal">Тоо ширхэгээ оруулна уу</p>
            <Input
              type="number"
              className="border rounded px-3 py-2 text-black"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              placeholder="Жишээ нь: 10"
              min="1"
            />
          </div>
        )}

        {orderQuantity && (
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-normal">Хүргэлтийн огноо</p>
            <Input
              type="date"
              className="border rounded px-3 py-2 text-black"
              min={format(new Date(), "yyyy-MM-dd")}
              value={deliveredDate}
              onChange={(e) => setDeliveredDate(e.target.value)}
            />
          </div>
        )}

        <Button onClick={handleAddOrder} className="bg-[#FE4B00]">
          Захиалга өгөх
        </Button>
        <Button onClick={onCancel} className="bg-[#212121]">
          Цуцлах
        </Button>

        {orders.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Захиалсан зүйлс:</p>
            <ul className="list-disc pl-5 text-sm">
              {orders.map((order, i) => (
                <li key={i}>
                  {order.factory} / {order.product} / {order.productType} /{" "}
                  {order.quantity} / {order.deliveredDate} / {order.shopName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
