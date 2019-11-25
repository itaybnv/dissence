using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server.packets
{
    class DownloadByIdPacket : Packet
    {
        public DownloadByIdPacket(Dictionary<string, object> data) : base(PacketType.downloadById, data)
        {
            
        }

        public override ResponsePacket Execute(User user)
        {
            DownloadHandler downloadHandler = new DownloadHandler();
            Server.channel.videoQueue.Add(new Video(data["title"].ToString(), data["channelTitle"].ToString(), data["id"].ToString(), data["thumbnailUrl"].ToString(), null));
            try
            {
                downloadHandler.ById(data["id"].ToString());
            }
            catch (Exception e)
            {
                return new ResponsePacket(new Dictionary<string, object>() { {"errorMessage", e.Message } }, PacketType.downloadById);
            }
            return new ResponsePacket(new Dictionary<string, object>() { {"test data", "this is a test data" } }, PacketType.downloadById);
        }
    }
}
