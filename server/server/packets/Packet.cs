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
        // From 0 normal
        getConnectedUsers,
        getSearchResults,
        getPlaylist,

        // From 200 events
        downloadById = 200,
        addToPlaylist,
        updateNickname,
        playAudio,
        skipAudio,
        RemoveAudio
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
