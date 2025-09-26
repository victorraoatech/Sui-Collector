import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Asset, FractionalOwnership } from '../types';
import { Button } from './Button';

interface FractionalOwnershipProps {
  asset: Asset;
  ownership: FractionalOwnership;
  onBuyShares: (shares: number) => void;
  loading?: boolean;
}

export const FractionalOwnership: React.FC<FractionalOwnershipProps> = ({
  asset,
  ownership,
  onBuyShares,
  loading = false
}) => {
  const [selectedShares, setSelectedShares] = useState(1);
  const [showOwners, setShowOwners] = useState(false);

  const totalCost = selectedShares * ownership.sharePrice;
  const ownershipPercentage = (selectedShares / ownership.totalShares) * 100;
  const availablePercentage = (ownership.availableShares / ownership.totalShares) * 100;

  return (
    <div className="bg-surface rounded-xl p-6 border border-secondary">
      <h3 className="text-xl font-bold mb-4">Fractional Ownership</h3>
      
      {/* Visual Representation */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-text-secondary mb-2">
          <span>Ownership Distribution</span>
          <span>{ownership.availableShares} of {ownership.totalShares} shares available</span>
        </div>
        
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-hover"
            initial={{ width: 0 }}
            animate={{ width: `${100 - availablePercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full bg-green-500 opacity-50"
            initial={{ width: 0 }}
            animate={{ width: `${ownershipPercentage}%` }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>Owned: {100 - availablePercentage:.1f}%</span>
          <span>Your selection: {ownershipPercentage:.2f}%</span>
        </div>
      </div>

      {/* Share Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Number of Shares
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max={ownership.availableShares}
            value={selectedShares}
            onChange={(e) => setSelectedShares(Number(e.target.value))}
            className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={ownership.availableShares}
              value={selectedShares}
              onChange={(e) => setSelectedShares(Math.min(Number(e.target.value), ownership.availableShares))}
              className="w-20 px-3 py-2 bg-background border border-secondary rounded-lg text-center"
            />
            <span className="text-sm text-text-secondary">shares</span>
          </div>
        </div>
      </div>

      {/* Purchase Summary */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">Share Price</span>
          <span className="font-mono">{ownership.sharePrice} SUI</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">Shares</span>
          <span className="font-mono">{selectedShares}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">Ownership</span>
          <span className="font-mono">{ownershipPercentage.toFixed(2)}%</span>
        </div>
        <div className="border-t border-secondary pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Cost</span>
            <span className="font-mono text-lg font-bold text-primary">{totalCost} SUI</span>
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <Button
        onClick={() => onBuyShares(selectedShares)}
        disabled={loading || selectedShares === 0}
        className="w-full py-3 text-lg"
      >
        {loading ? 'Processing...' : `Buy ${selectedShares} Share${selectedShares > 1 ? 's' : ''}`}
      </Button>

      {/* Current Owners */}
      <div className="mt-6">
        <button
          onClick={() => setShowOwners(!showOwners)}
          className="flex items-center justify-between w-full text-sm font-medium text-text-secondary hover:text-text-primary"
        >
          <span>Current Owners ({ownership.owners.length})</span>
          <motion.svg
            className="w-4 h-4"
            animate={{ rotate: showOwners ? 180 : 0 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        
        <motion.div
          initial={false}
          animate={{ height: showOwners ? 'auto' : 0, opacity: showOwners ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-3 space-y-2">
            {ownership.owners.map((owner, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-background rounded-lg">
                <span className="text-sm font-medium">{owner.username}</span>
                <div className="text-right">
                  <div className="text-sm font-mono">{owner.shares} shares</div>
                  <div className="text-xs text-text-secondary">{owner.percentage.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};