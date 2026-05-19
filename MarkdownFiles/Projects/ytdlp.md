# Using yt-dlp to download music


I will keep this dead simple, for more detailed information, please refer to the [arch wiki](https://wiki.archlinux.org/title/Yt-dlp) and the [yt-dlp github page](https://github.com/yt-dlp/yt-dlp).

1. Install the program.  you will need to install *yt-dlp* and *ffmpeg* at the very least.
```
sudo pacman -S yt-dlp ffmpeg
```

2. Once installed, make a directory where you want your playlist to live. Navigate to that directory.
```
mkdir ~/Music/myPlaylist
cd ~/Music/myPlaylist
```

3. Run yt-dlp
```
yt-dlp -x --audio-format mp3 --audio-quality 0 --output "%(playlist_index)s - %(title)s.%(ext)s" "[PlaylistURL]"
```
you can get more options from the `man` page, but the ones i have selected here work for me:
```
-x                  # Download audio only
--audio-format mp3  #You are downloading music that has already been compressed by youtube, anything less compressed than an mp3 file will be a false indicator of quality here.
--audio-quality 0   #highest quality option. Range is 1-10, default is 5. the lower the higher quality.
--output "%(playlist_index)s - %(title)s.%(ext)s"    # names the files as :"01 - Track Title.mp3
```

Regarding the URL for your playlist, yt-dlp supports youtube.com and music.youtube.com links.  Make sure your playlist is public, and that link should work.  The order of the songs in the playlist will be the order in which they are downloaded and numbered. The titles of the songs will be the title of the video they come from.  Use a music.youtube.com playlist for cleaner titles and metadata.  
You will need to import this into musicbrainz is you want truly clean metadata though. 