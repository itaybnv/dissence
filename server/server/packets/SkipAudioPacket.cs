using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class SkipAudioPacket : Packet
    {
        public SkipAudioPacket(Dictionary<string, object> data) : base(PacketType.skipAudio, data)
        {
        }

        public override ResponsePacket Execute(User user)
        {
            user.currentChannel.skipped = true;
            // The actual audio skip happens in the udp socket,
            // so all that is left to do is update the UI for everyone
            user.currentChannel.SkipAudio();
            return null;
        }
    }
}
