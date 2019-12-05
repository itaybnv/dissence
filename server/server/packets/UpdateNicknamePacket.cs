using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class UpdateNicknamePacket : Packet
    {
        public UpdateNicknamePacket(Dictionary<string, object> data) : base(PacketType.updateNickname, data)
        {

        }

        public override ResponsePacket Execute(User user)
        {
            string oldNick = user.Nickname;
            user.Nickname = data["nickname"].ToString();

            // send to all users the updated nickname
            Server.channel.UpdateNicknames(null, null);
            return null;
        }
    }
}
