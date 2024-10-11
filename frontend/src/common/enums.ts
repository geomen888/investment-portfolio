export enum FundingRound {
  PRE_SEED = 'PRE_SEED',
  SEED = 'SEED',
  SERIES_A = 'SERIES_A',
  SERIES_B = 'SERIES_B',
  SERIES_C = 'SERIES_C'
};

export enum Tags {
  SASS = 'SaaS',
  FINTECH = 'FinTech',
  FINANCIAL_SERVICES = 'Financial Service',
  ENTERPRICE = 'Enterprise',
  SOFTWARE_DEV = 'Software Developer',
  TOOLS_AI = 'Tools AI',
  FOOD_BEVERAGES = 'Food & Beverages',
  CONSUMER = 'Consumer',
  REAL_ESTATE = 'Real Estate',
  PAYMENTS = 'Payments',
  LOGISTICS_SUPLY_CHAIN = 'Logistics and Supply Chain',
  PRODUCTION = 'Production'
};

export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}


export enum GoalInvestmentStatus {
  PENDING = 'pending',
  PAUSED = 'paused',
  FAILED = 'failed',
  SICCESS = 'success'
}

export enum InvestmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PAUSED = 'paused'
}