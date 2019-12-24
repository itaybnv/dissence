using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class Channel
    {
        public BindingList<Video> videoQueue { get; }
        public BindingList<User> userList { get; }
        public List<EndPoint> endpoints { get; }
        public BindingList<string> audioServerQueue { get; }
        public string channelName { get; set; }
        public bool skipped { get; set; }

        private bool isBusy;
        public bool IsBusy
        {
            get { return isBusy; }
            set
            {
                // If before was busy, and after isn't busy
                // it means it should go to the next audio
                if(isBusy && !value)
                {
                    isBusy = value;
                    PlayAudio();

                    videoQueue.RemoveAt(0);
                    UpdatePlaylist(null, null);
                }

                isBusy = value;
            }
        }

        public Channel(string channelName)
        {
            this.channelName = channelName;

            IsBusy = false;
            skipped = false;
            videoQueue = new BindingList<Video>();
            userList = new BindingList<User>();
            endpoints = new List<EndPoint>();
            audioServerQueue = new BindingList<string>();

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

            audioServerQueue.ListChanged += (sender, e) =>
            {
                // This is only in case the list was empty before 
                if (e.ListChangedType == ListChangedType.ItemAdded && !isBusy)
                {
                    PlayAudio();
                }
            };
        }

        public void UpdatePlaylist(object sender, ListChangedEventArgs e)
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
                    userList.Remove(user);
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
                    userList.Remove(user);
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
                    userList.Remove(user);
                    Console.WriteLine(Server.GetLineAndFile() + error.Message);
                }
            }
        }

        public void PlayAudio()
        {
            // if queue isn't empty
            if (audioServerQueue.Count > 0)
            {
                // Pop first item
                string filename = audioServerQueue.First();
                audioServerQueue.RemoveAt(0);

                isBusy = true;
                Server.AudioServer.BroadcastByFileName(filename, this);
            }
            // else do nothing
        }

        public void SkipAudio()
        {
            // Skip the audio for each client
            Dictionary<string, object> data = new Dictionary<string, object>();
            foreach (User user in userList)
            {
                try
                {
                    user.socket.Send(PacketEncoding.EncodeResponsePacket(new packets.ResponsePacket(data, PacketType.skipAudio)));
                }
                catch (Exception error)
                {
                    userList.Remove(user);
                    Console.WriteLine(Server.GetLineAndFile() + error.Message);
                }
            }

            // Finished playing / skipped
            UpdatePlaylist(null, null);
        }
    }
}
