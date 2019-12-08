﻿using System;
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
        private Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        private List<EndPoint> endpoints = new List<EndPoint>();

        public AudioServer()
        {
            socket.SetSocketOption(SocketOptionLevel.IP, SocketOptionName.ReuseAddress, true);
            socket.Bind(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 27015));
            new Thread(Listen).Start();
        }

        public void BroadcastByFileName(string filename)
        {
            List<byte[]> samples = AudioExtractor.Extract(filename);
            BroadcastSamples(samples);
        }

        private void Listen()
        {
            while (true)
            {
                // log connections for future reference
                EndPoint senderRemote = new IPEndPoint(IPAddress.Any, 0);
                socket.ReceiveFrom(new byte[1], ref senderRemote);
                endpoints.Add(senderRemote);
            }
        }

        private void SendSampleToEndpoints(byte[] sample)
        {
            foreach (EndPoint endpoint in endpoints)
            {
                socket.BeginSendTo(sample, 0, sample.Length, SocketFlags.None, endpoint, (_) => { Console.WriteLine(sample.Length); }, null);
            }
        }

        private void BroadcastSamples(List<byte[]> samples)
        {
            foreach (byte[] sample in samples)
            {
                SendSampleToEndpoints(sample);
                Thread.Sleep(40);
            }
        }
    }
}
