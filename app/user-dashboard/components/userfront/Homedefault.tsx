import { format, parseISO } from "date-fns";
import { mn } from "date-fns/locale";

const getWeekday = (dateStr: string) => {
  const date = parseISO(dateStr);
  return format(date, "EEEE", { locale: mn });
};

export const Homedefault = () => {
  const orders = [
    {
      id: 1,
      customer: "Бат",
      product: "Сүү",
      date: "2025-06-24",
      status: "Хүргэгдсэн",
    },
    {
      id: 2,
      customer: "Сараа",
      product: "Үхрийн мах",
      date: "2025-06-25",
      status: "Хүргэлтэнд",
    },
    {
      id: 3,
      customer: "Нэргүй",
      product: "Аарц",
      date: "2025-06-26",
      status: "Цуцлагдсан",
    },
  ];

  const groupedOrders: Record<string, typeof orders> = {};
  for (const order of orders) {
    const weekday = getWeekday(order.date);
    if (!groupedOrders[weekday]) groupedOrders[weekday] = [];
    groupedOrders[weekday].push(order);
  }

  const weekDays = [
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
    "Ням",
  ];

  return (
    <div className="space-y-4 relative">
      <p className="text-sm text-white font-medium">
        7 Хоногийн Захиалгын Түүх
      </p>
      {weekDays.map((day) => (
        <div key={day}>
          <h3 className="text-white font-semibold mb-1">{day}</h3>
          {groupedOrders[day] ? (
            <table className="min-w-full bg-[#2c2c2c] text-white rounded-lg overflow-hidden mb-4">
              <thead>
                <tr className="text-left text-sm bg-[#3a3a3a]">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Захиалагч</th>
                  <th className="px-4 py-2">Бүтээгдэхүүн</th>
                  <th className="px-4 py-2">Бүтээгдэхүүн төрөл</th>
                  <th className="px-4 py-2">Захиалсан огноо</th>
                  <th className="px-4 py-2">Хүргэлтийн Огноо</th>
                  <th className="px-4 py-2">Төлөв</th>
                </tr>
              </thead>
              <tbody>
                {groupedOrders[day].map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-[#444] text-sm hover:bg-[#3c3c3c]"
                  >
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.product}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Хүргэгдсэн"
                            ? "bg-green-600"
                            : order.status === "Хүргэлтэнд"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm italic mb-4">Захиалга алга</p>
          )}
        </div>
      ))}
    </div>
  );
};
