export const tiers = [
  {
    id: "scout",
    tier: 1,
    name: "Scout",
    rank: "Tier 1",
    scanThreshold: 5,
    referralThreshold: 0,
    rewardSol: 0.1,
    reward: "0.1 SOL"
  },
  {
    id: "sentinel",
    tier: 2,
    name: "Sentinel",
    rank: "Tier 2",
    scanThreshold: 25,
    referralThreshold: 1,
    rewardSol: 0.5,
    reward: "0.5 SOL"
  },
  {
    id: "guardian",
    tier: 3,
    name: "Guardian",
    rank: "Tier 3",
    scanThreshold: 50,
    referralThreshold: 3,
    rewardSol: 1.5,
    reward: "1.5 SOL"
  },
  {
    id: "defender",
    tier: 4,
    name: "Defender",
    rank: "Tier 4",
    scanThreshold: 100,
    referralThreshold: 5,
    rewardSol: 5,
    reward: "5 SOL"
  }
] as const;
