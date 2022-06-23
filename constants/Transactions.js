/**
 * Transactions.js
 */

module.exports = {
  TYPES: {
    Credit: 'Credit',
    Debit: 'Debit' 
  },
  SITUATION: {
    subscriptionInitiate: 'PLAN INITIATE',
    planInstallment: 'PLAN INSTALLMENT',
    holdInstallment: 'SKIP NOW HOLD',
    redeemInstallment: 'REDEEM HOLD GOLD',
    sellPlan: 'SELL PLAN',
    forfietedPlan: 'PLAN FORFIETED',
    completedPlan: 'PLAN COMPLETED',
    orderPlaced: 'ORDER PLACED',
    orderRedeemGoldHold: 'ORDER REDEEMABLE GOLD IS HOLD',
    orderHoldRedeemed: 'ORDER HOLD GOLD IS REDEEMED',
    instantBuy: 'INSTANT GOLD BUY',
    instantSell: 'INSTANT GOLD SELL',
    orderHoldReleased: 'ORDER CANCELED GOLD RELEASED',
    loanApplied: 'LOAN APPLIED',
    loanInstallmentRecovery: 'LOAN INSTALLMENT RECOVERED FROKM HOLD GOLD',
    loanDefualt: 'LOAN DEFUALT GOLD RECOVERED',
    loanPrincipalReceived: 'LOAN PRINCIPAL RECIEVED',
    scanSent: 'SEND',
    scanRecieved: 'RECIEVE',
    settle: 'SETTLE',
    HoldGoldBid: 'GOLD HOLD FOR BID',
    BidSent: 'GOLD TRANSAFERED MONEY RECIEVED',
    BidReceived: 'GOLD RECIEVED MONEY SENT',
    ReleaseGoldBid: 'AgreementFailed'
  }
};
