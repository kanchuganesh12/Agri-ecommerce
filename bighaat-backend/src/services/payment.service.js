export const initiatePayment = async ({ orderId, amount, method }) => {
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

export const verifyPayment = async (transactionId) => {
    return { verified: true, transactionId };
};
