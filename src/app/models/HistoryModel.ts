import {TrackedTimeModel} from './TrackedTimeModel';
import {Model} from './Model';

export interface HistoryModel extends Model{
  trackedTimes: TrackedTimeModel[];
  from: number;
  to: number;
}
