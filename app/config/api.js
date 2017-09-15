module.exports = {
    prefix: 'api',
    port: {
        http: 3000,
        http2: 3001
    },
    jwt: {
        public: 'public-key',
        private: 'private-key',
        algorithm: 'HS512'
    }
}