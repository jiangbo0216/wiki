## [Increasing the amount of inotify watchers](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details)

If you are not interested in the technical details and only want to get Listen to work:

If you are running Debian, RedHat, or another similar Linux distribution, run the following in a terminal:
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
If you are running ArchLinux, run the following command instead (see [here](https://www.archlinux.org/news/deprecation-of-etcsysctlconf/) for why):
`echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system`

### technical details
Listen uses inotify by default on Linux to monitor directories for changes. It's not uncommon to encounter a system limit on the number of files you can monitor. For example, Ubuntu Lucid's (64bit) inotify limit is set to 8192.

You can get your current inotify file watch limit by executing:

$ cat /proc/sys/fs/inotify/max_user_watches
When this limit is not enough to monitor all files inside a directory, the limit must be increased for Listen to work properly.

You can set a new limit temporary with:

$ sudo sysctl fs.inotify.max_user_watches=524288
$ sudo sysctl -p
If you like to make your limit permanent, use:

$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p
You may also need to pay attention to the values of max_queued_events and max_user_instances if Listen keeps on complaining.

## E: Could not get lock /var/lib/dpkg/lock-frontend - open (11: Resource temporarily unavailable) [duplicate]

This may happen if

'Synaptic Package Manager' or 'Software Updater' is open.

Some apt command is running in Terminal.

Some apt process is running in background.

For above wait for the process to complete. If this does not happen run in terminal:

sudo killall apt apt-get
If none of the above works, remove the lock files. Run in terminal:

sudo rm /var/lib/apt/lists/lock
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock*
then reconfigure the packages. Run in terminal:

sudo dpkg --configure -a
and

sudo apt update
That should do the job.