using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
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
            user.currentChannel.videoQueue.Add(new Video(data["title"].ToString(), data["channelTitle"].ToString(), data["id"].ToString(), data["thumbnailUrl"].ToString(), data["videoDuration"].ToString()));
            DownloadHandler downloadHandler = new DownloadHandler();
            try
            {
                new Thread(() => downloadHandler.ById(data["id"].ToString(), user.currentChannel)).Start();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            
            return null;
        }
    }
}
