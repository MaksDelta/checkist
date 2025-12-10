export interface QueueItem {
  id: number;
  name: string;
  type: string;
  priority: string;
  account: string;
  due: string;
}

export interface Policy {
  id: number;
  accountId: number;
  name: string;
  lob: string;
  line?: string;
  broker?: string;
  premium: number;
  ratedPremium?: number;
  lossRatio?: number;
  appetite?: string;
  status: string;
  triage?: string;
  winability?: string;
  effective?: string;
  expiration?: string;
}
