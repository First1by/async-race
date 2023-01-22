import { CarService } from './car.service';
import { Race } from './race';

const race = new Race(new CarService());
race.init();
