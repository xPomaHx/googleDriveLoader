import path from 'path';
import { google as googleapis } from 'googleapis';
import fs from 'promise-fs';

import keys from '@root/configs/oauth2.keys.json';

const tokenFilePath = path.resolve('data/google', 'tokens.json');
const OAuth2 = new googleapis.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

const isTokenValid = tokens => {
  return tokens.expiry_date - Date.now() > 1 * 60 * 1000;
};

const readTokenFile = () => fs.readFile(tokenFilePath).then(JSON.parse);

const codeToTokens = async code => (await OAuth2.getToken(code)).tokens;

const writeTokensFile = tokens =>
  fs.writeFile(tokenFilePath, JSON.stringify(tokens));

export const setCode = async code => codeToTokens(code).then(writeTokensFile);

let GLOBALtoken = null;
export const auth = async () => {
  const tokens = GLOBALtoken || (await readTokenFile());
  GLOBALtoken = tokens;
  if (!(await isTokenValid(tokens))) {
    console.log('refresh token');
    const { tokens: newTokens } = await OAuth2.refreshToken(
      tokens.refresh_token
    );
    Object.assign(tokens, newTokens);
    await writeTokensFile(tokens);
  }
  OAuth2.setCredentials(tokens);
  return OAuth2;
};

export const getAuthUrl = () => {
  return OAuth2.generateAuthUrl({
    prompt: 'consent',
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive']
  });
};
