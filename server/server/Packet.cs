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
        getConnectedUsers,
    }

    abstract class Packet
    {
        private PacketType type;
        protected string data;
        
        public Packet(PacketType type)
        {
            this.type = type;
        }

        public abstract Packet Execute()
        {

        };
    }
}
