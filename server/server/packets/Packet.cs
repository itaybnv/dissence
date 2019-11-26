using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using server.packets;

namespace server
{
    enum PacketType
    {
        getConnectedUsers,
        getSearchResults,
        filePacket,

        downloadById = 200,
        addToPlaylist = 201
    }

    abstract class Packet
    {
        public PacketType type { get; }
        public Dictionary<string, object> data { get; }
        
        public Packet(PacketType type, Dictionary<string, object> data)
        {
            this.type = type;
            this.data = data;
        }

        public abstract ResponsePacket Execute(User user);

    }
}
