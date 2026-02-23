// Payment service placeholder
// Integrate with Razorpay / PhonePe / Paytm as needed

exports.initiatePayment = async ({ orderId, amount, method }) => {
    // For now, return mock success
    return {
        success: true,
        transactionId: `TXN_${Date.now()}`,
        orderId,
        amount,
        method,
        status: "success",
    };
};

exports.verifyPayment = async (transactionId) => {
    return { verified: true, transactionId };
};
