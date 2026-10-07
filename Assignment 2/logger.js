const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
    next();
};

module.exports = logger;