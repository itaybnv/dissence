using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class GetPlaylistPacket : Packet
    {
        public GetPlaylistPacket(Dictionary<string, object> data) : base(PacketType.getPlaylist, data)
        {

        }

        public override ResponsePacket Execute(User user)
        {
            Dictionary<string, object> data = new Dictionary<string, object>() { { "playlist", Server.channel.videoQueue } };
            ResponsePacket responsePacket = new ResponsePacket(data, PacketType.getPlaylist);

            return responsePacket;
        }
    }
}
