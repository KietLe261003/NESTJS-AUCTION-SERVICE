
import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  host: process.env.MARIADB_DB_HOST || 'localhost',
  port: parseInt(process.env.MARIADB_DB_PORT, 10) || 3306,
  username: process.env.MARIADB_DB_USERNAME || 'auction',
  password: process.env.MARIADB_DB_PASSWORD || '@Giahau123',
  name: process.env.MARIADB_DB_NAME || 'auction_asset_db',
}));

