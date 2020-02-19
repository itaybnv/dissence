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
            user.currentChannel.Playing = false;
            return null;
        }
    }
}
