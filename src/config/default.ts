export default (): any => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongoConnectionStr: process.env.MONGO_CONNECTION_STR,
  },
});
