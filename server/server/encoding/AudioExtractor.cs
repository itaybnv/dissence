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
        /// <summary>
        /// Takes an ogg file and splits it down to a list of pcms 
        /// </summary>
        /// <param name="fileName">The full file name</param>
        /// <returns>A list of byte arrays (pcms) that represent the full audio file</returns>
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
                        byte[] outputBytes = new byte[1920 * 4];
                        int outputBytesLength = encoder.Encode(pcm, 0, 1920, outputBytes, 0, outputBytes.Length);
                        outputBytes = outputBytes.Take(outputBytesLength).ToArray();
                        samples.Add(outputBytes);
                    }
                }
            }

            return samples;
        }
    }
}
