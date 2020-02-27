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
        private Socket listenSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        private Socket sendSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        private List<EndPoint> endpoints = new List<EndPoint>();
        private string currentPlayingFile = "";

        public AudioServer()
        {
            listenSocket.Bind(new IPEndPoint(IPAddress.Any, 27015));
            new Thread(Listen).Start();
        }

        public void BroadcastByFileName(string filename, Channel channel)
        {
            currentPlayingFile = filename;
            List<byte[]> samples = AudioExtractor.Extract(filename);
            BroadcastSamples(samples, channel, filename);
        }

        private void Listen()
        {
            EndPoint senderRemote;
            while (true)
            {
                byte[] data = new byte[2048];

                senderRemote = new IPEndPoint(IPAddress.Any, 0);

                try
                {
                    listenSocket.ReceiveFrom(data, ref senderRemote);

                    // Trim the channel name byte array to get rid of empty bytes, and convert it to string
                    string channelName = Encoding.UTF8.GetString(data.TakeWhile((v, index) => data.Skip(index).Any(w => w != 0x00)).ToArray());

                    // Get the channel with the name the user sent, and add the user's endpoint to the channel's list list
                    Server.channels.Where(channel => channel.channelName == channelName).First().endpoints.Add(senderRemote);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                }
                 
            }
        }

        private void SendSampleToEndpoints(byte[] sample, Channel channel)
        {
            foreach (EndPoint endpoint in channel.endpoints)
            {
                try
                {
                    listenSocket.BeginSendTo(sample, 0, sample.Length, SocketFlags.None, endpoint, null, null);
                }
                catch (Exception)
                {
                    channel.endpoints.Remove(endpoint);
                }
            }
        }

        private void BroadcastSamples(List<byte[]> samples, Channel channel, string filename)
        {
            foreach (byte[] sample in samples)
            {
                // If the channels gets unbusy in the middle of playing an audio
                // it means one of the users skipped the playing song.
                // Channel skipped is changed by a recieved tcp packet from clients.
                if (channel.Playing && filename == currentPlayingFile)
                {
                    SendSampleToEndpoints(sample, channel);
                    Thread.Sleep(36);
                }
            }
        }
    }
}
