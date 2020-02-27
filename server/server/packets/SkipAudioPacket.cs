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

            // Tell all clients to delete the audio buffer
            System.Threading.Thread.Sleep(10);
            user.currentChannel.UpdateSkipAudio();

            return null;
        }
    }
}
