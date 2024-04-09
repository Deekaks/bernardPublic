** **
## Bernards Public Repository
Publicly visible version of the privately used Bernard discord bot used for showcase purposes, see specific methods in-code for scraping data.
** **

## UserId Fetching via Keyword Search
Using roblox's open API for the user search engine, bernard can with 95% accuracy return the correct players userid, dependent on correct spelling.

> Commands affected:
```
/fetchid
```

## Select Group Fetching via UserId
Utilizing roblox's open API bernard can easily return information regarding specific groups an user may be in, and their respective ranks, with each embed also utilizing the thumbnail API for returning the specified users thumbnail.png.
> Commands affected:
```
/find
/goi
/revamp
```


## Misc Entertainment Commands
Using basic discordjs and logical building I was able to create multiple commands for requested quality of life purposes:

``/sendtochannel`` | The bot sends a message to the specified channel via channelId

``/bernflip`` | The bot flips a very uneven coin, good for quickly getting a yes or no answer.

``/raffle`` | Similar to the coinflip command, but this one supports multiple keywords sent by the user and chooses one of them randomly.

``/nerdify`` | Takes input in the form of a mentioned user in server and reacts to any of their messages with a nerd emoji for a set duration.

``/commands`` | Displays all the above commands and explains them in simpler terms.

> [!NOTE]
> This repository wont stay up to date reliably, all new features or hidden ones may not be visible.
