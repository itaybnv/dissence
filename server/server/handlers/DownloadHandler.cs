﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FFmpeg.NET;
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

        public void ById(string id, Channel channel)
        {
            // If the file doesn't already exist, download
            if (!File.Exists($"./audio_files/{id}.mp3"))
            {
                // Download audio only
                ytdl.Options.PostProcessingOptions.ExtractAudio = true;
                ytdl.Options.FilesystemOptions.Output = $"./audio_files/{id}.mp3";
                ytdl.Options.PostProcessingOptions.AudioFormat = NYoutubeDL.Helpers.Enums.AudioFormat.mp3;
                ytdl.VideoUrl = $"https://www.youtube.com/watch?v={id}";

                // Subscribe to console output
                ytdl.StandardOutputEvent += (sender, output) => Console.WriteLine("YTDL: " + output);
                ytdl.StandardErrorEvent += (sender, errorOutput) => 
                {
                    throw new Exception(errorOutput);
                };

                // Execute download
                ytdl.Download();

                ConvertMp3ToOpusOgg(id);

            }

            channel.audioServerQueue.Add(id);
        }

        private void ConvertMp3ToOpusOgg(string id)
        {
            Engine ffmpeg = new Engine();

            ffmpeg.ExecuteAsync($"-i ./audio_files/{id}.mp3 " +
                                "-c:a libopus " +
                                "-b:a 128k " +
                                "-compression_level 10 " +
                                "-application audio " +
                                "-ar 48000 " +
                                $"-frame_duration 40 ./audio_files/{id}.ogg").Wait();


        }
    }
}
