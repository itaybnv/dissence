using Concentus.Oggfile;
using Concentus.Structs;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace server
{
    class AudioExtractor
    {
        public static List<byte[]> Extract(string fileName)
        {
            const int CHANNELS = 2;
            List<byte[]> samples = new List<byte[]>();
            using (FileStream stream = File.Open($"./audio_files/{fileName}", FileMode.Open))
            {
                OpusEncoder encoder = new OpusEncoder(48000, CHANNELS, Concentus.Enums.OpusApplication.OPUS_APPLICATION_AUDIO);
                OpusDecoder decoder = new OpusDecoder(48000, CHANNELS);
                OpusOggReadStream oggIn = new OpusOggReadStream(decoder, stream);
                while (oggIn.HasNextPacket)
                {
                    short[] pcm = oggIn.DecodeNextPacket();
                    if (pcm != null)
                    {
                        byte[] outputBytes = new byte[2048];
                        encoder.Encode(pcm, 0, 960, outputBytes, 0, outputBytes.Length);

                        samples.Add(outputBytes);
                    }
                }
            }

            return samples;
        }
    }
}
