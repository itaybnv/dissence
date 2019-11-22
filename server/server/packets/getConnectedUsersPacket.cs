using server.packets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class GetConnectedUsersPacket : Packet
    {
        public GetConnectedUsersPacket(Dictionary<string, object> data) : base(PacketType.getConnectedUsers, data)
        {

        }

        public override ResponsePacket Execute(User user)
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data.Add("users", Server.channel.userList);

            ResponsePacket responsePacket = new ResponsePacket(data, PacketType.getConnectedUsers);

            return responsePacket;
        }
    }
}
