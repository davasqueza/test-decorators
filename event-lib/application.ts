import { HANDLER_BASE, HANDLER_LIST } from './constants';

export class Application {
    private handlersContainers: Map<string, any>;

    constructor() {
        this.handlersContainers = new Map();
    }

    addHandlersContainer(HandlerContainer) {
        const containerBase = Reflect.getMetadata(HANDLER_BASE, HandlerContainer);
        if(!containerBase) {
            console.error("Invalid container");
        }
        else {
            const containerInstance = new HandlerContainer();
            this.handlersContainers.set(containerBase, containerInstance);
        }
    }

    handle(fullEventName: string, params: any[]) {
        const [base, event] = fullEventName.split(":");
        const handler = this.getHandlerByEvent(base, event);
        if(!handler) {
            console.warn(`Unable to find a suitable handler for event ${fullEventName}`);
            return;
        }

        try {
            const response = handler(...params);
            console.log("Handler response => " + JSON.stringify(response));
            return response;
        } catch (e) {
            console.error(`Unexpected error when handling event ${fullEventName}: ${e.message}`);
        }
    }

    private getHandlerByEvent(base: string, event: string): Function | null {
        if(!this.handlersContainers.has(base)) { return null; }
        const container = this.handlersContainers.get(base);

        let handlers: Map<string, string> = Reflect.getMetadata(HANDLER_LIST, container) || new Map();
        return container[handlers.get(event)].bind(container);
    }
}