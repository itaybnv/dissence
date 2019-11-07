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
        protected PacketType type;
        protected Dictionary<string, string> data;
        
        public Packet(PacketType type, Dictionary<string, string> data)
        {
            this.type = type;
            this.data = data;
        }

        public abstract Packet Execute();
    }
}
