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
        
        /// <summary>
        /// Constructs a packet object
        /// </summary>
        /// <param name="type">The type of the packet</param>
        /// <param name="data">The data of the packet</param>
        public Packet(PacketType type, Dictionary<string, object> data)
        {
            this.type = type;
            this.data = data;
        }

        /// <summary>
        /// Executes the actions that the packet is required to fulfill.
        /// </summary>
        /// <param name="user">The user that sent the packet that is executed</param>
        /// <returns>Returns a response packet, that the server will send back to the user.
        /// If the packet is a non-callback packet, then this function will return null</returns>
        public abstract ResponsePacket Execute(User user);

    }
}
