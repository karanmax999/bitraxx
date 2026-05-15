/**
 * BitraXx Token Sale Configuration
 *
 * This file centralizes all constants and configuration related to the BRX token sale.
 * When real Web3 integration is added, some of these values (e.g., raised amounts)
 * can be replaced with dynamic data fetched from smart contracts.
 */

export const TOKEN_CONFIG = {
  name: "BitraXx",
  symbol: "BRX",
  decimals: 18,
  totalSupply: 1_000_000_000,
  hardCapUSD: 10_000_000,
  overallRaisedUSD: 4_200_000,
  softCapPct: 50,
};

export type StageStatus = "completed" | "live" | "upcoming";

export interface SaleStage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  allocation: number;
  allocationPct: number;
  raiseUSD: number;
  startDate: string;
  endDate: string;
  status: StageStatus;
  filledPct: number;
  tokensRaised: number;
  description: string;
  features: string[];
}

export const SALE_STAGES: SaleStage[] = [
  {
    id: "seed",
    name: "Seed Round",
    subtitle: "Private Sale",
    price: 0.005,
    allocation: 50_000_000,
    allocationPct: 5,
    raiseUSD: 250_000,
    startDate: "Jan 1, 2026",
    endDate: "Mar 31, 2026",
    status: "completed",
    filledPct: 100,
    tokensRaised: 50_000_000,
    description: "Earliest entry. Maximum upside. Limited allocation for founding supporters.",
    features: [
      "Price: $0.005 per BRX",
      "Allocation: 50M BRX (5%)",
      "6-month cliff, 18-month vest",
      "Bronze VIP tier on launch",
      "Founding supporter NFT badge",
    ],
  },
  {
    id: "presale",
    name: "ICO Phase 1",
    subtitle: "Public Presale",
    price: 0.015,
    allocation: 150_000_000,
    allocationPct: 15,
    raiseUSD: 2_250_000,
    startDate: "May 15, 2026",
    endDate: "Aug 31, 2026",
    status: "live",
    filledPct: 62,
    tokensRaised: 93_000_000, // 62% of 150M
    description: "Public presale. Best available price before exchange listing.",
    features: [
      "Price: $0.015 per BRX",
      "Allocation: 150M BRX (15%)",
      "3-month cliff, 12-month vest",
      "Silver VIP tier on launch",
      "Launchpad whitelist access",
      "BRX Shield activation",
    ],
  },
  {
    id: "listing",
    name: "Exchange Listing",
    subtitle: "Public Market",
    price: 0.05, // Projected starting price
    allocation: 0, // Open market
    allocationPct: 0,
    raiseUSD: 0,
    startDate: "Sep 3, 2026",
    endDate: "TBD",
    status: "upcoming",
    filledPct: 0,
    tokensRaised: 0,
    description: "Public market launch. Price targets are projections, not guarantees.",
    features: [
      "Est. listing: $0.05 – $0.25",
      "Open market — no allocation cap",
      "No vesting — immediate liquidity",
      "Full VIP tier eligibility",
      "DEX + CEX availability",
      "Governance rights active",
    ],
  },
];

export function getCurrentStage(): SaleStage | undefined {
  return SALE_STAGES.find((stage) => stage.status === "live");
}
