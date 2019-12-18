using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace server
{
    class AudioServer
    {
        private Socket multiSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        private List<EndPoint> endpoints = new List<EndPoint>();

        public AudioServer()
        {
            multiSocket.SetSocketOption(SocketOptionLevel.IP, SocketOptionName.ReuseAddress, true);
            multiSocket.Bind(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 27015));
            new Thread(Listen).Start();
        }

        public void BroadcastByFileName(string filename, Channel channel)
        {
            List<byte[]> samples = AudioExtractor.Extract(filename);
            BroadcastSamples(samples, channel);
        }

        private void Listen()
        {
            while (true)
            {
                byte[] data = new byte[2048];

                EndPoint senderRemote = new IPEndPoint(IPAddress.Any, 0);
                multiSocket.ReceiveFrom(data, ref senderRemote);

                // Trim the channel name byte array to get rid of empty bytes, and convert it to string
                string channelName = Encoding.UTF8.GetString(data.TakeWhile((v, index) => data.Skip(index).Any(w => w != 0x00)).ToArray());

                // Get the channel with the name the user sent, and add the user's endpoint to the channel's list list
                Server.channels.Where(channel => channel.channelName == channelName).First().endpoints.Add(senderRemote);
            }
        }

        private void SendSampleToEndpoints(byte[] sample, Channel channel)
        {
            foreach (EndPoint endpoint in channel.endpoints)
            {
                try
                {
                    multiSocket.BeginSendTo(sample, 0, sample.Length, SocketFlags.None, endpoint, null, null);
                }
                catch (Exception)
                {
                    channel.endpoints.Remove(endpoint);
                }
            }
        }

        private void BroadcastSamples(List<byte[]> samples, Channel channel)
        {
            foreach (byte[] sample in samples)
            {
                // If the channels gets unbusy in the middle of playing an audio
                // it means one of the users skipped the playing song.
                // Channel skipped is changed by a recieved tcp packet from clients.
                if (channel.IsBusy && !channel.skipped)
                {
                    SendSampleToEndpoints(sample, channel);
                    Thread.Sleep(20);
                }
                // Skipped
                else
                {
                    // Reset bools
                    channel.IsBusy = false;
                    channel.skipped = false;
                }
            }

            // Finished playing, tell the channel that it is done
            channel.IsBusy = false;
        }
    }
}
