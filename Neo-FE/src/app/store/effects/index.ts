import { AuthEffects } from './auth.effect';
import { DashboardEffects } from './dashboard.effect';
import { HistoryEffects } from './history.effect';
import { MetadataEffects } from './metadata.effect';
import { NasaDashboardEffects } from './nasa-dashboard.effect';
import { PollingDataEffects } from './polling.effect';


export const neoEffects = [AuthEffects, DashboardEffects, HistoryEffects, MetadataEffects, NasaDashboardEffects, PollingDataEffects];
