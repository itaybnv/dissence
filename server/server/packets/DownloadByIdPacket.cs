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
            Server.channel.videoQueue.Add(new Video(data["title"].ToString(), data["channelTitle"].ToString(), data["id"].ToString(), data["thumbnailUrl"].ToString(), null));
            DownloadHandler downloadHandler = new DownloadHandler();
            try
            {
                new Thread(() => downloadHandler.ById(data["id"].ToString(), Server.AudioServer.BroadcastByFileName)).Start();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            //Check if file already exists, if not download and send, if yes just send it
            //after download, dont send right away, add it to queue in audio server, and audio server will send it alone
            // when the current audio finished or skipped
            return null;
        }
    }
}
