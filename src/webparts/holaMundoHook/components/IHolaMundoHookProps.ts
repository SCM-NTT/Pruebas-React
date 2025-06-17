import { MSGraphClientV3 } from '@microsoft/sp-http';
export interface IHolaMundoHookProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  graphClient:Promise<MSGraphClientV3>;
}
