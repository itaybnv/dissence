using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace server
{
    enum PacketType
    {
        getConnectedUsers
    }

    abstract class Packet
    {
        public PacketType type { get; }
        public Dictionary<string, string> data { get; }
        
        public Packet(PacketType type, Dictionary<string, string> data)
        {
            this.type = type;
            this.data = data;
        }

        public abstract Packet Execute();
    }
}
