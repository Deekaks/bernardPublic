** **
## Bernards Public Repository
Publicly visible version of the privately used Bernard discord bot used for showcase purposes, see specific methods in-code for scraping data.
** **

## Status Displays in-game Statistics
Sending a get request to the first listed server on the API, fetches the current playercount, and average ping / fps, then displays it on the status message.
Tweaked with a feature to have the presence change depending on the playercount, ie. Online: > 40, Idle: < 40, DnD: < 65

-40

![online](https://github.com/Deekaks/bernardPublic/assets/102224382/373f522b-532d-46f4-a941-dc2e5e32f29a)
** **

-65

![idle](https://github.com/Deekaks/bernardPublic/assets/102224382/2cde787f-5033-4406-b5b4-3f960bdd9488)
** **

+65

![dnd](https://github.com/Deekaks/bernardPublic/assets/102224382/d92d3d9e-22f8-42fc-aed4-dcd41f6ee521)
** **



## UserId Fetching via Keyword Search
Using roblox's open API for the user search engine, bernard can with 95% accuracy return the correct players userid, dependent on correct spelling.

> Commands affected:
```
/fetchid
```
![fetchid](https://github.com/Deekaks/bernardPublic/assets/102224382/58e8ad73-19f4-4214-8d8b-cc293adc8b7e)
![fetchid2](https://github.com/Deekaks/bernardPublic/assets/102224382/b021762b-f120-4a23-b21d-8c72814bf130)


## Select Group Fetching via UserId
Utilizing roblox's open API bernard can easily return information regarding specific groups an user may be in, and their respective ranks, with each embed also utilizing the thumbnail API for returning the specified users thumbnail.png.
> Commands affected:
```
/find
/goi
/revamp
```
![fetchid3](https://github.com/Deekaks/bernardPublic/assets/102224382/eaeb3826-c0c6-4318-bafc-d24d9acc743d)


## Misc Entertainment Commands
Using basic discordjs and logical building I was able to create multiple commands for requested quality of life features:

** **

``/sendtochannel`` | The bot sends a message to the specified channel via channelId

![sendtochannel](https://github.com/Deekaks/bernardPublic/assets/102224382/d5558a3e-3df5-4278-9812-324004677756)

![sendtochannel2](https://github.com/Deekaks/bernardPublic/assets/102224382/842b5bd2-2fc6-4650-9b8e-eedb682184a0)

** **

``/bernflip`` | The bot flips a very uneven coin, good for quickly getting a yes or no answer.

![bernflip](https://github.com/Deekaks/bernardPublic/assets/102224382/8dff30fe-abb3-4b19-9c01-4e1e88dc234e)

** **

``/raffle`` | Similar to the coinflip command, but this one supports multiple keywords sent by the user and chooses one of them randomly.

![raffle](https://github.com/Deekaks/bernardPublic/assets/102224382/c315e92b-77e7-4a22-9de4-960078558442)

![raffle2](https://github.com/Deekaks/bernardPublic/assets/102224382/0f08c499-4d67-4d74-b59a-661c938ae0d6)

** **

``vote`` | Typing "vote" into a specified channel will make bernard automatically react with ✅, 🟨, ❌, to the post.

![vote](https://github.com/Deekaks/bernardPublic/assets/102224382/e4b94d49-cd4f-4498-b689-e6705e527c3a)

** **

``/nerdify`` | Takes input in the form of a mentioned user in server and reacts to any of their messages with a nerd emoji for a set duration.

``/commands`` | Displays all the above commands and explains them in simpler terms.

> [!NOTE]
> This repository wont stay up to date reliably, all new features or hidden ones may not be visible.
