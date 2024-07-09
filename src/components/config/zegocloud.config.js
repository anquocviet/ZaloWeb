import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';

let zegocloudConfig = (user) => {
  const appID = 1356371488;
  const serverSecret = '519036ed99423eb2cdfa59d496343d9f';
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, user.id + '', user.name);
  const zc = ZegoUIKitPrebuilt.create(kitToken);
  zc.addPlugins({ ZIM });
  zc.setCallInvitationConfig({
    ringtoneConfig: {
      incomingCallUrl: 'Nhac-chuong-cuoc-goi-Zalo.mp3',
      outgoingCallUrl: 'nhac-chuong-rong-den-remix-tiktok.mp3', // The ringtone when sending a call invitation.
    },
  });

  return zc;
};

export default zegocloudConfig;
