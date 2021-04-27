import EventEmitter from "eventemitter3";
import { Observable } from "rxjs";

class EventBusSrv {
  constructor() {
    this.emitter = new EventEmitter();
  }
  publish(event) {
    this.emitter.emit(event.type, event);
  }

  subscribe(typeFilter, handler) {
    return this.getStream(typeFilter).subscribe({ next: handler });
  }

  getStream(eventType) {
    return new Observable((observer) => {
      const handler = (event) => {
        observer.next(event);
      };

      this.emitter.on(eventType.type, handler);

      return () => {
        this.emitter.off(eventType.type, handler);
      };
    });
  }
}

export default EventBusSrv;
