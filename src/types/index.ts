export interface UserBalance {
  cashBalance: number;
  coinBalance: number;
}

export interface BetSlipItem  {
  game: string;
  bet: string;
  odds: string;
}

export interface BetsResponse  {
  userBalance: UserBalance;
  betSlip: BetSlipItem[];
}

export type BetType = "Singles" | "Parlay"