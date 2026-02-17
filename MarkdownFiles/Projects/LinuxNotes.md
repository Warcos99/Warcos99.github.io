# Notes for my Linux Terminal PC

I have an old laptop that is too old to run anything by arch linux running on pure tty.  Running any sort of graphical interface is just too damn slow.

So here, I am putting some notes that make running a computer on terminal only usable.

---

### Downloading apps

```
sudo pacman -S [appname]
```
or 
```
yay -S [appname]
```

and Updating all just run:

```
sudo pacman -Syu
```



---

### Calendar and ToDo list

download an app called `[calcurse]`
lets you keep a todo list, and a calendar all very easily usable from terminal.

The app itself is very intuitive,  no need to add a how to here.  You can figure it out. :p

---

### Make an FTP client

FTP is a way to transfer files over internet accross devices sharing the same internet connection.

download `[lftp]`

then, on device that will be manipulating the files, use
```
lftp ftp://[username]@[ip]:[port]
```

use `{ls}`, `{put}`, and `{get}` to move files around.
example:
```
put /home/Marcos/Downoads/book.epub # moves a file from downloads into ftp directory
```

---

### Connect to internet from terminal

use `[iwctl]`

```
device list
station [name] scan
station [name]get-networks
station [name] connect [ssid]
```

If a password is needed, it will automatically prompt you for it.

---

### Change login screen

When booting up the PC, the terminal login screen will be based on what is on `/etc/issue`

you must be in `sudo` to edit that file.

---

### Home Made Commands

If you wish to make a simple command, you can add it to `~/.bashrc`

Make sure to to be in sudo to edit that file.

example:
```
alias cff-'clear && fastfetch'
```
that sets it so that when you type "cff" into terminal, the computer will interprit it as if you ran "clear && fastfetch"   giving you a nice shortcut.


for a more complicated function, you can add something like this:
```
compile-pdf(){
	pandoc $(cat filelist.txt) --pdf-engine=tectonic -o "$1"
}
```

this particular code allows for the home made command to intake a user variable.  
and example of what this would look like in terminal would be:
```
compile-pdf output.pdf
```
where "output.pdf" is whatever we wish the output to be called.

In this particular example, you are running pandoc, a program that turns files into pdf, to turn a list of files listed in a 'filelist.txt' document into a single pdf.  that pdf will be titled "output.pdf"

---

### Web Browsing

use `[links]`

you can either just type "links" into the terminal to open up browser window, or you can type 
```
links google.com
```
to go directly to the page you provide.

from the links browser, typing "s" will bring up the bookmarks, and pressing "esc" will bring up the general toolbar window.
pressing "q" quits the program.

---

### Psuedo Tile Window Manager

For an ecosystem similar to hyperland, use dvtm

You can set dvtm to run once you login on `[~/.bash_profile]`

just put this in the file:
```
[[ -z $DISPLAY && $(tty) = /dev/tty1 ]] && exec ~/bin/dvtm-launch
```
You can also set it so that there is a header bar at the top of the terminal, helping you keep track of useful things like battery levels, time, and network connectivity.  
  
Once you have that code above in the bash_profile file, then to set the header, go to `[~/bin/dvtm-launch] and add this:

```
FIFO="/tmp/dvtm-status.$$"

[ -p "FIFO" ] || mkfifo -m 600 "$FIFO" || exit 1

while true; do

	#battery info
	battery=$(acpi -b 2>/dev/null | sed -n 's/^Battery [0-9]: \([^,]*\),\([^,]*\),.*$/\1 \2/p')
	[ -z "battery" ] && battery="NoBat"

	#Internet connectivity
	if ping -c 1 -W 1 google.com >/dev/null 2>&1; then
		net="Net:OK"
	else
		net="Net:FAIL"
	fi
	
	#Date and Time
	datetime=$(date "+%Y-%m-%d %H:%M")
	
	#Output status line
	echo "Bat: $battery | $net | $datetime"
	
	sleep 5
	
done > "$FIFO" &

STATUS_PID=$!
dvtm -s "$FIFO" "$@" 2> /dev/null
kill $STATUS_PID
wait $STATUS_PID 2> /dev/null
rm -f "$FIFO"
```

This should set it so when you log into tty1 you will log into a running session of dvtm with the status bar at the top.

From within dvtm, you can add tiles much like a tiling window manager.

the MOD key is `[ctrl+g]`
and the basic keybindings to get you started are:

- `[ctrl+g]' = MOD
- `[MOD+c]` = new window
- `[MOD+x+x]` = close window
- `[MOD+?]`= view key bindings

---

### Exporting markdown to pdf and copying to flash drive

use `pandoc` to turn an md file into a pdf
```
pandoc file.md -o file.pdf --pdf-engine=tectonic
```
This will generate a pdf file with the markdown formatting.

Then you want to copy this file to a flashdrive, to do so you first need to mount hte drive. Once it's plugged in, run

```
lsblk
```
find your drive, in this example the drive can be found as "/dev/sdb1", and if it not automounted, mount it with 
```
sudo mount /dev/sdb1 /mnt
```
you can check that this mounted correctly with:
```
ls /mnt
```
Then it's just a matter of copying the file to the correct place:
```
sudo cp /path/to/file.pdf /path/to/mnt
```

---

### Games on terminal

- `bastet` = tetris clone
- `ninvaders` = invaders clone
- `pacman4console` = exactly what it sounds like
- `nsnake` = snake for console

---





