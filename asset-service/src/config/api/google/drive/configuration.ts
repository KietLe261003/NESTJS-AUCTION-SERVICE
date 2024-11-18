import { registerAs } from '@nestjs/config'
export default registerAs('googleDrive', () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  redirectUrl: process.env.GOOGLE_REDIRECT_URL,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
}));
