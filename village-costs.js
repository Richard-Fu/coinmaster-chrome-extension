// Village cost data for Coin Master Chrome Extension
const villageData = [
  { id: 1, cost: 3950000, costFormatted: '3.95 Million' },
  { id: 2, cost: 6620000, costFormatted: '6.62 Million' },
  { id: 3, cost: 11890000, costFormatted: '11.89 Million' },
  { id: 4, cost: 16430000, costFormatted: '16.43 Million' },
  { id: 5, cost: 20400000, costFormatted: '20.40 Million' },
  { id: 10, cost: 43440000, costFormatted: '43.44 Million' },
  { id: 20, cost: 74930000, costFormatted: '74.93 Million' },
  { id: 30, cost: 102200000, costFormatted: '102.2 Million' },
  { id: 50, cost: 256700000, costFormatted: '256.7 Million' },
  { id: 79, cost: 1000000000, costFormatted: '1.0 Billion' },
  { id: 100, cost: 2800000000, costFormatted: '2.8 Billion' },
  { id: 200, cost: 88800000000, costFormatted: '88.8 Billion' },
  { id: 300, cost: 1600000000000, costFormatted: '1.6 Trillion' },
  { id: 400, cost: 32600000000000, costFormatted: '32.6 Trillion' },
  { id: 500, cost: 620700000000000, costFormatted: '620.7 Trillion' },
  { id: 516, cost: 996900000000000, costFormatted: '996.9 Trillion' }
];

function getVillageById(id) {
  const village = villageData.find(v => v.id === id);
  if (village) return village;
  
  // Estimate for missing levels
  return {
    id: id,
    cost: estimateCost(id),
    costFormatted: formatCost(estimateCost(id))
  };
}

function estimateCost(level) {
  if (level <= 100) {
    return Math.floor(level * level * 300000);
  } else if (level <= 200) {
    return Math.floor(level * level * 500000);
  } else if (level <= 300) {
    return Math.floor(level * level * 800000000);
  } else {
    return Math.floor(level * level * 1000000000000);
  }
}

function formatCost(cost) {
  if (cost >= 1000000000000) {
    return (cost / 1000000000000).toFixed(1) + ' Trillion';
  } else if (cost >= 1000000000) {
    return (cost / 1000000000).toFixed(1) + ' Billion';
  } else if (cost >= 1000000) {
    return (cost / 1000000).toFixed(1) + ' Million';
  } else if (cost >= 1000) {
    return (cost / 1000).toFixed(1) + 'K';
  } else {
    return cost.toLocaleString();
  }
}
