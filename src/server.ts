import { app } from "./app";
import { orderWorker } from "./consumers/order-consumer";

orderWorker();
app.listen(3000, () => console.log('server is running on port 3000'));