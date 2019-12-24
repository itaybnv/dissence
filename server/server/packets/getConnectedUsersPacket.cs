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
            // select just the nicknames from the userlist
            data.Add("nicknames", user.currentChannel.userList.Select(u => u.Nickname).ToArray());
            ResponsePacket responsePacket = new ResponsePacket(data, PacketType.getConnectedUsers);

            return responsePacket;
        }
    }
}
