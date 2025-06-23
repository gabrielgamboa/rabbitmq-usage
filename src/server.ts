import { app } from "./app";
import { OrderWorker } from "./consumers/order-consumer";

OrderWorker.start();
app.listen(3000, () => console.log('server is running on port 3000'));