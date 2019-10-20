import fs from 'promise-fs';
import { google as googleapis } from 'googleapis';
import { auth } from '@root/providers/googleAuth';

export default async (req, res) => {
  const FOLDER_ID = '1L_B561EOuZZT4vBMDNlWP55bE4UBBojv';
  const DRIVE_ID = '0ANgXLSTRW9G8Uk9PVA';
  const drive = googleapis.drive({
    version: 'v3',
    auth: await auth()
  });
  const {
    data: { id: fileId }
  } = await drive.files.create({
    supportsAllDrives: true,
    requestBody: {
      name: 'test30.webp',
      driveId: DRIVE_ID,
      parents: [FOLDER_ID]
    },
    media: {
      body: fs.createReadStream('./data/static/test.webp')
    }
  });
  const {
    data: {
      permissions: [{ id: permissionId }]
    }
  } = await drive.permissions.list({
    supportsAllDrives: true,
    fileId
  });
  await drive.permissions.delete({
    supportsAllDrives: true,
    fileId,
    permissionId
  });
  await drive.permissions.create({
    fileId,
    supportsAllDrives: true,
    requestBody: {
      type: 'anyone',
      role: 'reader'
    }
  });
  res.send(`https://drive.google.com/uc?id=${fileId}`);
};
