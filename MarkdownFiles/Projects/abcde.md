# Ripping CDs using abcde

First off, for proper documentation can always be found on the arch linux wiki.  abcde can be found on aur.

[arch wiki link](https://aur.archlinux.org/packages/abcde)

[abcde upstream link](https://abcde.einval.com/wiki/)

---

abcde stands for "A Better CD Encoder", it is a command line tool to easily rip CD's with metadata from the picard-musicbrainz database.  This page is not intended to get nitty gritty in the details of how it all works or how deep you can get with it.  Mostly this is here to to get you started using it. 

1. Install the program
```
yay -S abcde
```

2. That's basically it. If you have musicbrainz installed, it should work right out of the box.  If you don't have it, you may have to install it.  [musicbrainz aur](https://aur.archlinux.org/packages/picard-git)
```
yay -S picard-git 2.11-1
```

3. Time to actually use it to rip some CD's. First change directory to the location that you want your music file into.  In my case, I put the ripped CD's:
```
cd Music/CDs
```

4. Insert the CD into the drive and run:
```
abcde
```

The program will scan the CD, try to figure out it's metadata through MusicBrainz, and when it finds the CD information, it will show it to you and ask you to pick the correct one.  Most cases, it will only show you one hit, so it will ask you to choose between [0]ignoring the metadata it found and [1]accepting the metadata it found.  In some cases it will find several hits, if that happens the options will be: [0]ignore,[1]first hit, [2]second hit, etc...

Once the metadata is selected it will then ask you if you wish to edit any of the entries. (if no metadata was selected it will take you through a menu where it has you fill out that metadata manually).  For the most part, just select "No" here, unless you see otherwise, editing the metadata it finds is usually not necessary.

Then that's it! The program will go through and rip all the songs automatically adding the metadata to it. It will default to ripping them as flac files.

here are some customization you can make as you run the code to change some preferences:

```
man abcde    # Open manual page for abcde

#----Change Output Format
abcde -o flac    # output as FLAC
abcde -o mp3    # output as MP3
abcde -o flac,mp3    # output as FLAC & mp3
abcde -o [filetype]    #supports lots, check man page

#----Other Settings
abcde -1    # Encode CD into a single fil
abcde -N    # Non-interactive mode. Do not ask anything from user, just go ahead.
abcde -p    # Pad track numbers with 0's
abcde -x    # eject CD when all tracks have been read
abcde [tracks]    # process only specified tracks. If this is not specified, it will process the whole CD
abcde 1-5 7 9    # process tracks: 1,2,3,4,5,7,9
```

Files end up in the following naming/directory structure by default:

```
/chosen directory
    [Artist-Album]
        [01.TrackTitle]
        [02.TrackTitle]
        ...
```

If desired, this can be changed by adding a file: `~/.abcde.conf` and editing that file.  Check `man` for more information.

That's basically it! you can always dig a little deeper, but I have found it to be mostly plug and play, and have yet to find a CD that it cannot handle!