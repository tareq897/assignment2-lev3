import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoute } from "./app/modules/products/product.route";
import { OrderRoute } from "./app/modules/order/order.route";
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoute);
app.use("/api/orders",OrderRoute)




app.get("/", (req: Request, res: Response) => {
  res.send("Crud Operation");
});

export default app;
