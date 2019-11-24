using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class ResponsePacket
    {
        public Dictionary<string, object> data { get; set; }
        public PacketType responseType;

        public ResponsePacket() { }

        public ResponsePacket(Dictionary<string, object> data, PacketType responseType)
        {
            this.data = data;
            this.responseType = responseType;
        }

    }
}
