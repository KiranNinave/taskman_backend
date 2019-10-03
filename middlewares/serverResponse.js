module.exports = () => {
    return (req, res, next) => {
        res.sendCreated = function(responseObject = {}) {
            return this.status(201).json(responseObject);
        };

        res.sendBadRequest = function(responseObject = {}) {
            return this.status(400).json(responseObject);
        };

        res.sendServerError = function() {
            return this.status(500).json({ message: "Internal server error" });
        };

        res.sendAlreadyExists = function(responseObject = {}) {
            return this.status(409).json(responseObject);
        };
        next();
    };
};
