using System;
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
        public BindingList<User> userList { get; }
        public Dictionary<string, Video> searchHistory;

        public Channel()
        {
            videoQueue = new BindingList<Video>();
            userList = new BindingList<User>();
            searchHistory = new Dictionary<string, Video>();

            videoQueue.ListChanged += (sender, e) =>
            {
                if (e.ListChangedType == ListChangedType.ItemAdded)
                {
                    UpdatePlaylist(sender, e);
                }
            };

            userList.ListChanged += (sender, e) =>
            {
                if (e.ListChangedType == ListChangedType.ItemDeleted)
                {
                    UpdateNicknames(sender, e);
                }
            };
        }

        private void UpdatePlaylist(object sender, ListChangedEventArgs e)
        {
            Dictionary<string, object> data = new Dictionary<string, object>() { { "playlist", videoQueue } };
            // Send new video details to all clients
            foreach (User user in userList)
            {
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
        }

        public void UpdateNicknames(object sender, ListChangedEventArgs e)
        {
            Dictionary<string, object> data = new Dictionary<string, object>() { {"nicknames", userList.Select(u => u.Nickname).ToList() } };
            foreach (User user in userList)
            {
                try
                {
                    user.socket.Send(PacketEncoding.EncodeResponsePacket(new packets.ResponsePacket(data, PacketType.updateNickname)));
                }
                catch (Exception error)
                {
                    Server.channel.userList.Remove(user);
                    Console.WriteLine(Server.GetLineAndFile() + error.Message);
                }
            }
        }

        public void UpdatePlayAudio(bool playOrStop)
        {
            Dictionary<string, object> data = new Dictionary<string, object>() { { "playOrStop", playOrStop } };
            foreach (User user in userList)
            {
                try
                {
                    user.socket.Send(PacketEncoding.EncodeResponsePacket(new packets.ResponsePacket(data, PacketType.playAudio)));
                }
                catch (Exception error)
                {
                    Server.channel.userList.Remove(user);
                    Console.WriteLine(Server.GetLineAndFile() + error.Message);
                }
            }
        }
    }
}
