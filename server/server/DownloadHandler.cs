using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NYoutubeDL;

namespace server
{
    class DownloadHandler
    {
        private YoutubeDL ytdl;
        public DownloadHandler()
        {
            ytdl = new YoutubeDL();
        }

        public void ById(string id)
        {
            // Download audio only
            ytdl.Options.PostProcessingOptions.ExtractAudio = true;
            ytdl.Options.FilesystemOptions.Output = $"../../audio_files/{id}.mp3";
            ytdl.VideoUrl = $"https://www.youtube.com/watch?v={id}";

            bool test = false;
            // Subscribe to console output
            ytdl.StandardOutputEvent += (sender, output) => Console.WriteLine("OUTPUT: " + output);
            ytdl.StandardErrorEvent += (sender, errorOutput) => 
            {
                throw new Exception(errorOutput);
            };

            // Execute download
            ytdl.Download();
        }
    }
}
