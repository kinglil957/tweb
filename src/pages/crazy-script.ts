import pause from '../helpers/schedulers/pause';
import {MUTE_UNTIL} from '../lib/mtproto/mtproto_config';
import rootScope from '../lib/rootScope';

export async function subscribeToContacts() {
  const channels = await rootScope.managers.appChatsManager.getGenericChannelRecommendations();

  const chats = channels.chats.slice(0, 15);

  for(const chat of chats) {
    await rootScope.managers.appChatsManager.joinChannel(chat.id);

    await pause(2000);

    await rootScope.managers.appMessagesManager.mutePeer({peerId: chat.id.toPeerId(true), muteUntil: MUTE_UNTIL});

    await pause(3000);
  }
}
