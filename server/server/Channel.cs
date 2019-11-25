﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Channel
    {
        public BindingList<Video> videoQueue { get; }
        public List<User> userList { get;  }
        public Dictionary<string, Video> searchHistory;

        public Channel()
        {
            videoQueue = new BindingList<Video>();
            userList = new List<User>();
            searchHistory = new Dictionary<string, Video>();

            videoQueue.ListChanged += (sender, e) =>
            {
                if (e.ListChangedType == ListChangedType.ItemAdded)
                {
                    // Send new video details to all clients
                    foreach (User user in userList)
                    {
                        Dictionary<string, object> data = new Dictionary<string, object>() { { "title", videoQueue[e.NewIndex].Title },
                                                                                             { "thumbnailUrl", videoQueue[e.NewIndex].ThumbnailUrl },
                                                                                             { "channelTitle", videoQueue[e.NewIndex].ChannelTitle } };

                        try
                        {
                            user.socket.Send(PacketEncoding.EncodeResponsePacket(new packets.ResponsePacket(data, PacketType.addToPlaylist)));

                        }
                        catch (Exception error)
                        {
                            Server.channel.userList.Remove(user);
                            Console.WriteLine(Server.GetLineAndFile() + error.Message);
                        }
                    }

                    
                    // Send the actual video file to all clients
                }
            };
        }
    }
}
