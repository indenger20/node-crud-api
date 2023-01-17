import { ApplicationError } from '../application.error';

class RouteResolveErrorBase extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'RouteResolveErrorBase';
  }
}

export default RouteResolveErrorBase;
