using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class PlayAudioPacket : Packet
    {
        public PlayAudioPacket(Dictionary<string, object> data) : base(PacketType.playAudio, data)
        {

        }

        public override ResponsePacket Execute(User user)
        {
            Console.WriteLine("REACHEDADASDASDA");
            Server.channel.UpdatePlayAudio((bool)data["playOrStop"]);
            return null;
        }
    }
}
