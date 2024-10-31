export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    db_host: process.env.DATABASE_HOST,
    db_port: process.env.DATABASE_PORT,
    db_user: process.env.DATABASE_USER,
    db_password: process.env.DATABASE_PASSWORD,
    db_schema: process.env.DATABASE_SCHEMA,
  };
};
