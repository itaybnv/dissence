using Newtonsoft.Json;
using server.packets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class PacketEncoding
    {
        // Map dictionary that maps packet types to their packet object
        private static readonly Dictionary<PacketType, Type> packetTypes = new Dictionary<PacketType, Type> {
            { PacketType.getConnectedUsers, typeof(GetConnectedUsersPacket) },
            { PacketType.getSearchResults, typeof(GetSearchResultPacket) },
            { PacketType.downloadById, typeof(DownloadByIdPacket) },
            { PacketType.updateNickname, typeof(UpdateNicknamePacket) },
            { PacketType.getPlaylist, typeof(GetPlaylistPacket) },
            { PacketType.playAudio, typeof(PlayAudioPacket) },
            { PacketType.skipAudio, typeof(SkipAudioPacket) }
        };

        public static Packet DecodePacket(byte[] packet, int packetType)
        {
            Dictionary<string, object> dataDict;
            Packet readyPacket;
            string packetDataJson;
            object[] parameters;
            Type type;

            // Convert byte array to string
            // The packet is sent as a string of a Json object
            packetDataJson = Encoding.UTF8.GetString(packet, 0, packet.Length);
            Console.WriteLine(packetDataJson);
            // Convert from Json string to dict for ease of use
            dataDict = JsonConvert.DeserializeObject<Dictionary<string, object>>(packetDataJson);

            // Get the type of packet needed to instantiate
            type = packetTypes[(PacketType)packetType];

            // Set the parameters of the packet object
            parameters = new object[1] { dataDict };

            // Create an object of type packetType, and pass the tye 
            readyPacket = (Packet)Activator.CreateInstance(type, parameters);

            Console.WriteLine("packet type: " + packetType);
            return readyPacket;
        }

        public static byte[] EncodeResponsePacket(ResponsePacket packet)
        {
            // Type byte buffer
            byte[] responseTypeBuffer = new byte[1] { (byte)packet.responseType };
            // Data byte buffer
            byte[] responseDataBuffer = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(packet.data));
            // Buffer for Type and data both
            byte[] responseBuffer = new byte[responseTypeBuffer.Length + responseDataBuffer.Length];
            // Place the type byte in the first byte of the response buffer
            Buffer.BlockCopy(responseTypeBuffer, 0, responseBuffer, 0, responseTypeBuffer.Length);
            // Place te data bytes in the rest of the response buffer
            Buffer.BlockCopy(responseDataBuffer, 0, responseBuffer, responseTypeBuffer.Length, responseDataBuffer.Length);
            return responseBuffer;
        }
    }
}
