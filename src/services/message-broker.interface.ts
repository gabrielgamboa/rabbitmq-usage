export interface MessageBroker {
   start(): Promise<void>;
   publishMessageInExchange(exchange: string, message: string): Promise<void>;
   consume(queue: string, callback: (message: any) => void): Promise<any>;
}