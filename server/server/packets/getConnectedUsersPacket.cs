using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class GetConnectedUsersPacket : Packet
    {
        public GetConnectedUsersPacket(Dictionary<string, string> data) : base(PacketType.getConnectedUsers, data)
        {
        }

        public override Packet Execute()
        {
            throw new NotImplementedException();
        }
    }
}
