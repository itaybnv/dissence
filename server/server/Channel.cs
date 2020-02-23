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

        private bool playing;
        public bool Playing
        {
            get { return playing; }
            set
            {
                // playing is the previous value, and value is the new one
                // if it was playing, and the new value is no longer playing
                if(playing && !value)
                {
                    // This removes the video from videoqueue after it finished playing
                    videoQueue.RemoveAt(0);
                    if(audioServerQueue.Count > 0)
                    {
                        PlayAudio();

                    }
                    else
                    {playing = value;}
                }
                else { playing = value; }
            }
        }

        public Channel(string channelName)
        {
            this.channelName = channelName;

            Playing = false;
            videoQueue = new BindingList<Video>();
            userList = new BindingList<User>();
            endpoints = new List<EndPoint>();
            audioServerQueue = new BindingList<string>();

            videoQueue.ListChanged += UpdatePlaylist;

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
                if (e.ListChangedType == ListChangedType.ItemAdded && !playing)
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

        public void UpdateSkipAudio()
        {
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
                string filename = audioServerQueue.First() + ".ogg";
                audioServerQueue.RemoveAt(0);

                playing = true;
                new System.Threading.Thread(() => Server.AudioServer.BroadcastByFileName(filename, this)).Start();
            }
        }

        public void RemoveAudio(int index)
        {
            videoQueue.RemoveAt(index);
            audioServerQueue.RemoveAt(index - 1);
        }
    }
}
