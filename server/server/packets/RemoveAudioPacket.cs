using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class RemoveAudioPacket : Packet
    {
        public RemoveAudioPacket(Dictionary<string, object> data) : base(PacketType.RemoveAudio, data)
        {
        }

        public override ResponsePacket Execute(User user)
        {
            user.currentChannel.RemoveAudio((string)data["id"]);
            return null;
        }
    }
}
