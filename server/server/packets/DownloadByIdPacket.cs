using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class DownloadByIdPacket : Packet
    {
        public DownloadByIdPacket(Dictionary<string, object> data) : base(PacketType.filePacket, data)
        {
            
        }

        public override ResponsePacket Execute(User user)
        {
            DownloadHandler downloadHandler = new DownloadHandler();
            try
            {
                downloadHandler.ById(data["videoId"].ToString());
            }
            catch (Exception e)
            {
                return new ResponsePacket(new Dictionary<string, object>() { {"errorMessage", e.Message } }, PacketType.filePacket);
            }
            Server.channel.videoQueue.Add(data["videoID"].ToString());
            return new ResponsePacket();
            //return new ResponsePacket(new Dictionary<string, object>() { { "message", "successfull" } }, PacketType.filePacket);
        }
    }
}
