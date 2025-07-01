import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "Бүтээгдэхүүний нэр оруулна уу"),
  description: z.string().optional(),
  stock: z.number().int().min(0, "Нөөц хасах байж болохгүй"),
  ingredient: z.string().optional(),
  barcode: z.number().int().optional(),
  price: z.number().int().min(0, "Үнэ хасах байж болохгүй"),
  expired_at: z.number().int().optional(),
  image: z.string().url("Зургийн URL буруу байна").optional().or(z.literal("")),
  vendor_id: z.string().min(1, "Борлуулагчийн ID оруулна уу"),
  shop_id: z
    .string()
    .min(1, "Дэлгүүрийн ID оруулна уу")
    .optional()
    .or(z.literal("")),
});

export const updateProductSchema = z.object({
  title: z.string().min(1, "Бүтээгдэхүүний нэр оруулна уу").optional(),
  description: z.string().optional(),
  stock: z.number().int().min(0, "Нөөц хасах байж болохгүй").optional(),
  ingredient: z.string().optional(),
  barcode: z.number().int().optional(),
  price: z.number().int().min(0, "Үнэ хасах байж болохгүй").optional(),
  expired_at: z.number().int().optional(),
  image: z.string().url("Зургийн URL буруу байна").optional().or(z.literal("")),
  vendor_id: z.string().min(1, "Борлуулагчийн ID оруулна уу").optional(),
  shop_id: z
    .string()
    .min(1, "Дэлгүүрийн ID оруулна уу")
    .optional()
    .or(z.literal("")),
});

export const confirmDeliverySchema = z.object({
  productId: z.string().min(1, "Бүтээгдэхүүний ID оруулна уу"),
  shopId: z.string().min(1, "Дэлгүүрийн ID оруулна уу"),
  deliveryPersonId: z.string().min(1, "Хүргэгчийн ID оруулна уу"),
  pieces: z.number().int().min(1, "Тоо ширхэг дор хаяж 1 байх ёстой"),
  totalPrice: z.number().int().min(0, "Нийт үнэ хасах байж болохгүй"),
  transactionType: z.enum(["CASH", "TRANSFER", "NEXTPAYMENT"], {
    required_error: "Гүйлгээний төрөл оруулна уу",
  }),
  signature: z.string().optional().or(z.literal("")),
});

export const returnProductSchema = z.object({
  productId: z.string().min(1, "Бүтээгдэхүүний ID оруулна уу"),
  shopId: z.string().min(1, "Дэлгүүрийн ID оруулна уу"),
  deliveryPersonId: z.string().min(1, "Хүргэгчийн ID оруулна уу"),
  pieces: z.number().int().min(1, "Тоо ширхэг дор хаяж 1 байх ёстой"),
  signature: z.string().optional().or(z.literal("")),
});

export const createVendorSchema = z.object({
  name: z.string().min(1, "Борлуулагчийн нэр оруулна уу"),
  email: z.string().email("Имэйл хаяг буруу байна"),
  phone_number: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  image: z.string().url("Зургийн URL буруу байна").optional().or(z.literal("")),
});

export const updateVendorSchema = z.object({
  name: z.string().min(1, "Борлуулагчийн нэр оруулна уу").optional(),
  email: z.string().email("Имэйл хаяг буруу байна").optional(),
  phone_number: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  image: z.string().url("Зургийн URL буруу байна").optional().or(z.literal("")),
  is_active: z.boolean().optional(),
});
